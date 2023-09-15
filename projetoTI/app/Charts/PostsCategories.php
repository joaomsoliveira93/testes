<?php

declare(strict_types = 1);

namespace App\Charts;

use Chartisan\PHP\Chartisan;
use ConsoleTVs\Charts\BaseChart;
use Illuminate\Http\Request;
use App\models\Post;

class PostsCategories extends BaseChart
{
    public ?string $name = 'postsCategories';

    /**
     * Determines the name suffix of the chart route.
     * This will also be used to get the chart URL
     * from the blade directrive. If null, the chart
     * name will be used.
     */
    public ?string $routeName = 'postsCategories';
    

    /**
     * Determines the middlewares that will be applied
     * to the chart endpoint.
     */
    public ?array $middlewares = ['auth'];

    /**
     * Handles the HTTP request for the given chart.
     * It must always return an instance of Chartisan
     * and never a string or an array.
     */
    public function handler(Request $request): Chartisan
    {
        $comCategoria = count(Post::where('category_id', '!=', 'NULL')->get());
        $semCategoria = count(Post::get())-$comCategoria;
        return Chartisan::build()
            ->labels(['Com Categoria', 'Sem Categoria'])
            ->dataset('Sample', [$comCategoria, $semCategoria]);
    }
}