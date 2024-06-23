<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\NewsRepository;
use App\Entity\News;
use App\Form\AddNewsFormType;
use App\Form\EditNewsFormType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class NewsController extends AbstractController
{

    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/news', name: 'app_news')]
    public function index(): Response
    {
        return $this->render('news/index.html.twig', [
            'controller_name' => 'NewsController',
        ]);
    }


    #[Route('/api/news', name: 'news_list')]
    public function getNews(NewsRepository $newsRepository): JsonResponse
    {
        $news = $newsRepository->findAll();

        // Сериализация данных в JSON
        $data = [];
        foreach ($news as $new) {
            $data[] = [
                'id' => $new->getId(),
                'title' => $new->getTitle(),
                'description' => $new->getDescription(),
                'date' => $new->getDate(),
                'type' => $new->getType(),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/api/news/{id}', name: 'new_detail')]
    public function getNewDetail($id, NewsRepository $newsRepository): JsonResponse
    {
        $new = $newsRepository->find($id);

        if (!$new) {
            return new JsonResponse(['error' => 'New not found'], 404);
        }

        $data = [
            'id' => $new->getId(),
            'title' => $new->getTitle(),
            'description' => $new->getDescription(),
            'date' => $new->getDate(),
            'type' => $new->getType(),
        ];

        return new JsonResponse($data);
        // первый
    }

    #[Route('/news/add-news', name: 'add_news')]
    public function addNews(Request $request)
    {
        $news = new News();

        $news->setDate(new \DateTime());
        
        $form = $this->createForm(AddNewsFormType::class, $news);

        $form->handleRequest($request);

        // $user = $this->getUser();
        // $news->setIduser($user);



        if ($form->isSubmitted() && $form->isValid()) {

            $imageFile = $form->get('img')->getData();
            // Сохраняем изображение в public\images с уникальным именем
            $imageName = md5(uniqid()) . '.' . $imageFile->guessExtension();
            $imageFile->move(
                $this->getParameter('images_directory'),
                $imageName
            );
            // Сохраняем данные новости в базу данных
            $news->setImg($imageName);

            $this->entityManager->persist($news);
            $this->entityManager->flush();

            return $this->redirectToRoute('news'); 
        }

        return $this->render('news/add_news.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/news/{id}/edit", name="news_edit")
     */
    #[Route('/news/{id}/edit', name: 'news_edit')]
    public function edit(Request $request, News $news)
    {
        $form = $this->createForm(EditNewsFormType::class, $news);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $imgFile = $form['img']->getData();

            if ($imgFile) {
                $newFilename = uniqid().'.'.$imgFile->guessExtension();
                $imgFile->move(
                    $this->getParameter('images_directory'),
                    $newFilename
                );

                // Delete old image if needed
                $oldFilename = $news->getImg();
                if ($oldFilename) {
                    $oldPath = $this->getParameter('images_directory').'/'.$oldFilename;
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                }

                $news->setImg($newFilename);
            }
            
            $this->entityManager->persist($news);
            $this->entityManager->flush();

            return $this->redirectToRoute('news', ['id' => $news->getId()]);
        }

        return $this->render('news/edit.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}


