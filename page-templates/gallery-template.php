<?php
/**
 * Template Name: Gallery Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

    <header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_gallery_header'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('hero_title_gallery_header'); ?></h1>
                    </div>
                    <!-- /.header-caption -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>
    <div id="gallery">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <?php the_field('intro_text_gal_content'); ?>
                    <div id="gallery-photos">
                        <div class="row">

                            <?php 
                            $images = get_field('photo_gallery_page');
                            if( $images ): ?>
                                <?php foreach( $images as $image ): ?>
                                    <div class="col-md-6">
                                        <div class="gallery-box">
                                            <a href="<?php echo $image['sizes']['full-image']; ?>" data-fancybox="gallery">
                                            <span><i class="fal fa-search-plus"></i></span>
                                            <img src="<?php echo $image['sizes']['thumb-image']; ?>" class="img-responsive" alt="">
                                            </a>
                                        </div>
                                        <!-- /.gallery-box -->
                                    </div>
                                    <!-- /.col-md-6 -->
                                <?php endforeach; ?>
                            <?php endif; ?>                

                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /#gallery-photos -->
                </div>
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </div>


<?php get_footer(); ?>
