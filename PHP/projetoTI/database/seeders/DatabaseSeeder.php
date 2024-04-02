<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\models\User;
use App\models\Post;
use App\models\Study;
use App\models\Category;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

         User::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin'),
            'type'=>2,
            'active'=>true,
         ]);

         Post::factory()->create([
            'link' => 'https://www.linkedin.com/embed/feed/update/urn:li:share:6917884481487933440',
            'social_network' => 'Linkedin',
            'obs' => '',
         ]);

         Post::factory()->create([
            'link' => 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmunicipiodeaveiro%2Fvideos%2F234511675281532%2F',
            'social_network' => 'Facebook',
            'obs' => '',
         ]);

         Post::factory()->create([
            'link' => 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmunicipiodeaveiro%2Fvideos%2F678312613239323%2F&show_text=false',
            'social_network' => 'Facebook',
            'obs' => '',
         ]);

         Post::factory()->create([
            'link' => 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D5130568330340221%26set%3Da.666912883372477%26type%3D3&show_text=true',
            'social_network' => 'Facebook',
            'obs' => '',
         ]);

         Post::factory()->create([
            'link' => 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F156308777731505%2Fphotos%2Fa.156466444382405%2F5534744739887855%2F%3Ftype%3D3&show_text=true',
            'social_network' => 'Facebook',
            'obs' => '',
         ]);

         Post::factory()->create([
            'link' => 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D5350051611674239%26set%3Da.462925263720256%26type%3D3&show_text=true',
            'social_network' => 'Facebook',
            'obs' => '',
         ]);

         Post::factory()->create([
            'link' => 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D5244076312304166%26set%3Dgm.1392948581166064%26type%3D3&show_text=true',
            'social_network' => 'Facebook',
            'obs' => '',
         ]);

         Post::factory()->create([
            'link' => 'https://www.linkedin.com/embed/feed/update/urn:li:share:6929934125357277184',
            'social_network' => 'Linkedin',
            'obs' => '',
         ]);

         Post::factory()->create([
            'link' => 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:6930443889426219008',
            'social_network' => 'Linkedin',
            'obs' => '',
         ]);

         Post::factory()->create([
            'link' => 'https://www.linkedin.com/embed/feed/update/urn:li:share:6931379124309524480',
            'social_network' => 'Linkedin',
            'obs' => '',
         ]);

         for ($i=1; $i < 11; $i++) { 

         Study::factory()->create([
            'name' => 'Estudo '.$i,
            'obs' => 'A descrição do estudo '.$i.' serve apenas para demonstração do funcionamento dinamico da aplicação ',
            'created_at'=> now(),
            'finish_at' => now()->addDays(30),
         ]);

         Category::factory()->create([
            'name' => 'Categoria '.$i,
         ]);
         }
         

         
         
    }
}
