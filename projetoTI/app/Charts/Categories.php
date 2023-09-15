<?php

declare(strict_types=1);

namespace App\Charts;

use Chartisan\PHP\Chartisan;
use ConsoleTVs\Charts\BaseChart;
use Illuminate\Http\Request;
use \App\Models\Category;

class Categories extends BaseChart
{
    public ?string $name = 'categories';

    /**
     * Determines the name suffix of the chart route.
     * This will also be used to get the chart URL
     * from the blade directrive. If null, the chart
     * name will be used.
     */
    public ?string $routeName = 'categories';


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
        $categorias = Category::with('Posts')->get();

        $nomes =  array();
        $valores = array();
        $i = 0;
        foreach ($categorias as $categoria) {
            $nomes[$i] = $categoria->name;
            if ($categoria->Posts != null) {

                $valores[$i] = $categoria->Posts->where('category_id', $categoria->id)->count();
            } else {
                $valores[$i] = 0;
            }

            $i++;
        }

        return Chartisan::build()
            ->labels($nomes)
            ->dataset('Publicações', $valores);
    }
}
