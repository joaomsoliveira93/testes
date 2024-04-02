<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CabinetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'local' => $this->faker->streetName(),
            'coordX' => $this->faker->longitude($min = -8.44, $max = -8),
            'coordY' => $this->faker->latitude($min = 40.573, $max = 40.574),
        ];
    }
}
