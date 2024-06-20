<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\NewsRepository;

class NewsController extends AbstractController
{
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
    }
}


