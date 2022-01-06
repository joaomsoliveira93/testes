<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class clienteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nome' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'telefone' => $this->faker->randomNumber(9),
            'website' => $this->faker->text(),
            'morada' => $this->faker->text(),
            
        ];
    }
}
