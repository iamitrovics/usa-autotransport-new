<?php
/**
 * Template Name: Quote Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

    <header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_quote_page'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('custom_title_quote_header'); ?></h1>
                    </div>
                    <!-- /.header-caption -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>
    <section id="contact-intro-area" class="tracking-intro-area">
        <div class="intro-topleft-shape"></div>    
        <div class="container">
            <div class="row contact-intro-in">
                <div class="col-md-12">
                    <h2><?php the_field('form_title_quote_page'); ?></h2>
                    <?php the_field('form_code_quote_page'); ?>
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
        <div class="scroll-down"><a href="#reviews-area"><i class="icon-angle-right"></i></a></div>
        <!-- /.scroll-down -->
    </section>
    <!-- /#services-intro-area -->



    <section id="reviews-area" class="tracking-reviews">
        <div class="container">
            <div class="row">  
                <div class="col-lg-6">
                    <div class="section-intro">
                        <?php the_field('block_title_quote_reviews'); ?>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-lg-6 -->
                <div class="col-lg-6 abs-pos">
                    <div class="reviews-list">
                        <div id="reviews-slider">

                            <?php
                                $post_objects = get_field('reviews_list_quote_page');

                                if( $post_objects ): ?>
                                    <?php foreach( $post_objects as $post): // variable must be called $post (IMPORTANT) ?>
                                        <?php setup_postdata($post); ?>

                                        <div>
                                            <div class="review-box">
                                                <!-- <div class="img-holder">
                                                    <img src="img/misc/avatar.jpg" alt="">
                                                </div> -->
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

                                    <?php endforeach; ?>
                                <?php wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly ?>
                            <?php endif; ?>

                        </div>
                        <!-- /#reviews-slider -->
                    </div>
                    <!-- /.reviews-list -->
                </div>
                <!-- /.col-lg-6 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#reviews-area -->

<?php get_footer(); ?>
