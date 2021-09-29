<?php
/**
 * Template Name: Testimonials Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

<header id="testimonials-header" class=" page-wrapper" style="background-image: url(<?php the_field('background_image_test_hero'); ?>);">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="header-caption">
                    <h1><?php the_field('hero_title_test_hero'); ?></h1>
                    <?php the_field('hero_text_test_hero'); ?>
                </div>
                <!-- /.header-caption -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</header>

<section id="testimonial-intro-area">
    <div class="intro-topleft-shape"></div>    
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="testimonial-intro-content">
                    <h2><?php the_field('section_title_reviews_test_page'); ?></h2>
                </div>
                <!-- /.testimonial-intro-content -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
    <div id="testimonial-slider">

        <?php
        $loop = new WP_Query( array( 'post_type' => 'reviews', 'posts_per_page' => 115) ); ?>  
        <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

            <div>
                <div class="review-box">
                    <div class="content-area">
                        <div class="stars-area">
                            <?php if (get_field('review_score_test') == '5') { ?>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            <?php } elseif (get_field('review_score_test') == '4') { ?>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            <?php } elseif (get_field('review_score_test') == '3') { ?>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            <?php } elseif (get_field('review_score_test') == '2') { ?>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            <?php } elseif (get_field('review_score_test') == '1') { ?>
                                <i class="fas fa-star"></i>
                            <?php } ?>                               
                        </div>
                        <!-- /.stars-area -->
                        <div class="review-text">
                            <?php the_field('review_text'); ?>
                        </div>
                        <!-- /.review-text -->
                        <footer>
                            <span class="author"><?php the_title(); ?></span>
                            <?php if( get_field('location_review') ): ?>
                                <span class="location"><?php the_field('location_review'); ?></span>
                            <?php endif; ?>
                            <!-- /.location -->
                        </footer>
                    </div>
                    <!-- /.content-area -->
                </div>
                <!-- /.review-box -->
            </div>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>      

    </div>
    <!-- /#testimonial-slider -->
    <div class="btn-next">
        <a href="<?php the_field('button_link_reviews_page'); ?>"><?php the_field('button_label_reviews_page'); ?></a>
    </div>
    <!-- /.btn-next -->
</section>
<!-- /#testimonial-intro-area -->

<div id="about-main" class="testimonials-main">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-intro">
                    <h2><?php the_field('section_title_content_test'); ?></h2>
                </div>
                <!-- /.section-intro -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
        <div class="about-items">

            <?php if( have_rows('content_blocks_sec_testimonials') ): ?>
                <?php while( have_rows('content_blocks_sec_testimonials') ): the_row(); ?>

                    <section class="about-item">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="about-photo">
                                    <div class="ap-content"></div>
                                    <!-- /.ap-content -->
                                    <img src="<?php the_sub_field('featured_image'); ?>" alt="" class="ap-photo">
                                    <div class="shade"></div>
                                    <!-- /.shade -->
                                </div>
                                <!-- /.about-photo -->
                            </div>
                            <!-- /.col-md-5 -->
                            <div class="col-md-7">
                                <div class="about-content">
                                    <?php the_sub_field('content_block'); ?>
                                </div>
                                <!-- /.about-content -->
                            </div>
                            <!-- /.col-md-7 -->
                        </div>
                        <!-- /.row -->
                    </section>
                    <!-- /.about-item -->

                <?php endwhile; ?>
            <?php endif; ?>

        </div>
        <!-- /.about-items -->
    </div>
    <!-- /.container -->
    <div class="about-bottom-shade"></div>
    <div class="about-rb-shape"></div> 
</div>
<!-- /#about-main -->

<section id="testimonials-contact" style="background-image: url(<?php the_field('background_image_test_page_cta'); ?>);">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="cities-area-in">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="section-intro">
                                <h2><?php the_field('block_title_bottom_cta_test'); ?></h2>
                            </div>
                            <!-- /.section-intro -->
                        </div>
                        <!-- /.col-lg-5 -->
                        <div class="col-lg-7">
                            <div class="cities-list">
                                <div class="cities-list-in">
                                    <?php the_field('content_block_bottom_cta_test'); ?>
                                </div>
                                <!-- /.cities-list-in -->
                            </div>
                            <!-- /.cities-list -->
                        </div>
                        <!-- /.col-lg-7 -->
                    </div>
                    <!-- /.row -->
                </div>
                <!-- /.cities-area-in -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</section>
<!-- /#testimonials-contact -->

<?php get_footer(); ?>
