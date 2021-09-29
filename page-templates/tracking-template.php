<?php
/**
 * Template Name: Tracking Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

    <header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_tracking_hero'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('hero_title_tracking_hero'); ?></h1>
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
                    <h2><?php the_field('form_title_tracking_page'); ?></h2>
                    <?php the_field('form_code_track'); ?>
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
        <div class="scroll-down"><a href="#tracking-main"><i class="icon-angle-right"></i></a></div>
        <!-- /.scroll-down -->
    </section>
    <!-- /#services-intro-area -->

    <div id="tracking-main">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="trm-intro">
                        <h2><?php the_field('section_title_tracking_main'); ?></h2>
                    </div>
                    <!-- /.trm-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <div class="about-items">
                <section class="about-item">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="about-content">
                                <?php the_field('content_block_tracking_content'); ?>
                            </div>
                            <!-- /.about-content -->
                        </div>
                        <!-- /.col-lg-8 -->
                        <div class="col-lg-4">
                            <div class="about-photo">
                                <div class="ap-content"></div>
                                <!-- /.ap-content -->
                                <img src="<?php the_field('featured_image_tracf'); ?>" alt="" class="ap-photo">
                                <div class="shade"></div>
                                <!-- /.shade -->
                            </div>
                            <!-- /.about-photo -->
                        </div>
                        <!-- /.col-lg-4 -->
                    </div>
                    <!-- /.row -->
                </section>
                <!-- /.about-item -->
            </div>
            <!-- /.about-items -->
        </div>
        <!-- /.container -->
        <div class="about-bottom-shade"></div>
        <div class="about-rb-shape"></div> 
    </div>
    <!-- /#tracking-main -->

    <section id="tracking-contact" style="background-image: url(<?php the_field('background_image_process_page'); ?>);">
        <div class="container">
            <div class="row tc-intro">
                <div class="col-lg-6">
                    <h2><?php the_field('section_title_tracking_content'); ?></h2>
                </div>
                <!-- /.col-lg-6 -->
                <div class="col-lg-6">
                    <div class="tc-intro-button">
                        <a href="<?php the_field('button_link_process_page_cta'); ?>"><?php the_field('button_label_process_page'); ?></a>
                    </div>
                    <!-- /.tc-intro-button-->
                </div>
                <!-- /.col-lg-6 -->
            </div>
            <!-- /.row -->
            <div class="row tc-content">
                <div class="col-md-6">
                    <div class="tc-box">
                        <?php the_field('left_column_content_process'); ?>
                    </div>
                    <!-- /.tc-box -->
                </div>
                <!-- /.col-md-6 -->
                <div class="col-md-6">
                    <div class="tc-box">
                        <?php the_field('right_column_content_process'); ?>
                    </div>
                    <!-- /.tc-box -->
                </div>
                <!-- /.col-md-6 -->
            </div>
            <!-- /.row tc-content -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#tracking-contact -->

    <section id="reviews-area" class="tracking-reviews">
        <div class="container">
            <div class="row">  
                <div class="col-lg-6">
                    <div class="section-intro">
                        <?php the_field('intro_text_reviews_process_tracking'); ?>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-lg-6 -->
                <div class="col-lg-6 abs-pos">
                    <div class="reviews-list">
                        <div id="reviews-slider">

                            <?php
                                $post_objects = get_field('revies_list_intro_reviews_tracking');

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
