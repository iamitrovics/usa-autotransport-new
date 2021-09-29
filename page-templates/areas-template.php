<?php
/**
 * Template Name: Areas Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

    <header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_areas'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('custom_title_areas_header'); ?></h1>
                    </div>
                    <!-- /.header-caption -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>

    <section id="costs-area-about">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('intro_titlte_aras_page'); ?></h2>
                        <?php the_field('intro_text_areas_page'); ?>
                    </div>
                    <!-- /.section-intro -->

                    <div class="cities-list countries-list">
                        <ul>
                            <?php
                            $loop = new WP_Query( array( 'post_type' => 'cities', 'posts_per_page' => 115,
                            'orderby' => 'title', 'order'   => 'ASC',
                            
                            ) ); ?>  
                            <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

                                <li><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></li>

                            <?php endwhile; ?>
                            <?php wp_reset_postdata(); ?>                                                 
                            
                        </ul>
                    </div>
                    <!-- /.cities-list -->

                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#costs-area -->


  
<?php get_footer(); ?>
