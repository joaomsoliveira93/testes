<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LockerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'isFree' => $this->faker->boolean(),
            'cabinet_id' => $this->faker->numberBetween($int1 = 1, $int2 = 2)
        ];
    }
}
