<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package CodeFavorite_Starter_Theme
 */

get_header();
?>

        <?php
        $imageID = get_field('background_image_city_header');
        $image = wp_get_attachment_image_src( $imageID, 'full-image' );
        $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
        ?> 

    <header id="masheader" class="page-wrapper city-header sheaped-header" style="background-image: url(<?php echo $image[0]; ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('hero_title_city_header'); ?></h1>
                        <?php the_field('hero_text_city_header'); ?>
                    </div>
                    <!-- /.header-caption -->
                    <?php include(TEMPLATEPATH . '/inc/inc_quote_form.php'); ?>
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
        <img src="<?php bloginfo('template_directory'); ?>/img/bg/header-shape.png" alt="" class="header-shape">
    </header>

    <section id="city-intro-area">
        <div class="intro-topleft-shape"></div>    
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="about-intro-content">
                        <?php the_field('intro_text_city_page'); ?>
                        
                    </div>
                    <!-- /.about-intro-content -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <img src="<?php the_field('city_logo_url'); ?>" alt="" class="city-logo">
        </div>
        <!-- /.container -->
        <div class="scroll-down"><a href="#about-main"><i class="icon-angle-right"></i></a></div>
        <!-- /.scroll-down -->
    </section>

    <?php if( have_rows('content_sections_city') ): ?>
        <?php while( have_rows('content_sections_city') ): the_row(); ?>
            <?php if( get_row_layout() == 'content_blocks' ): ?>

                <div id="about-area" class="city-about-area">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="section-intro">
                                    <h2><?php the_sub_field('section_title'); ?></h2>
                                </div>
                                <!-- /.section-intro -->
                            </div>
                            <!-- /.col-md-12 -->
                        </div>
                        <!-- /.row -->
                        <div class="about-items">

                        <?php if( have_rows('content_blocks') ): ?>
                            <?php while( have_rows('content_blocks') ): the_row(); ?>

                                <section class="about-item">
                                    <div class="row">
                                        <div class="col-xl-5">
                                            <div class="about-photo">
                                                <div class="ap-content"></div>
                                                <!-- /.ap-content -->
                                                <?php
                                                $imageID = get_sub_field('featured_image');
                                                $image = wp_get_attachment_image_src( $imageID, 'about-image' );
                                                $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                                                ?> 
                                                
                                                <?php if( get_sub_field('button_label') ): ?>
                                                    <div class="ap-cta">
                                                        <a href="<?php the_sub_field('button_link'); ?>"><?php the_sub_field('button_label'); ?></a>
                                                    </div>
                                                    <!-- /.ap-cta -->
                                                <?php endif; ?>

                                                <img class="img-responsive ap-photo" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" />                                                 
                                            </div>
                                            <!-- /.about-photo -->
                                            
                                        </div>
                                        <!-- /.col-xl-5 -->
                                        <div class="col-xl-7">
                                            <div class="about-content">
                                                <?php the_sub_field('content_block'); ?>
                                            </div>
                                            <!-- /.about-content -->
                                        </div>
                                        <!-- /.col-xl-7 -->
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
                </div>
                <!-- /#about-area -->                

            <?php elseif( get_row_layout() == 'advantages' ): ?>

                <section id="city-advantages" style="background-image: url(<?php bloginfo('template_directory'); ?>/img/bg/city-why-bg.jpg);">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <h2><?php the_field('section_title_city_gen', 'options'); ?></h2>
                            </div>
                            <!-- /.col-md-12 -->
                        </div>
                        <!-- /.row -->
                        <div class="row advantage-items">

                        <?php if( have_rows('reasons_list_city_page', 'options') ): ?>
                            <?php while( have_rows('reasons_list_city_page', 'options') ): the_row(); ?>

                                <div class="col-lg-6">
                                    <div class="advantage-box">
                                        <img src="<?php the_sub_field('icon'); ?>" alt="">
                                        <div class="ab-box-in">
                                            <h3><?php the_sub_field('title'); ?></h3>
                                            <p><?php the_sub_field('text'); ?></p>
                                        </div>
                                        <!-- /.ab-box-in -->
                                    </div>
                                    <!-- /.advantage-box -->
                                </div>
                                <!-- /.col-lg-6 -->

                            <?php endwhile; ?>
                        <?php endif; ?>

                   

                        </div>
                        <!-- /.row advantage-items -->
                    </div>
                    <!-- /.container -->
                </section>
                <!-- /#city-advantages -->        
                
                <?php elseif( get_row_layout() == 'customer_care'): ?>

                <section id="cities-area" style="background-image: url(<?php bloginfo('template_directory'); ?>/img/bg/cities-area-single.jpg);">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="cities-area-in">
                                    <div class="row">
                                        <div class="col-lg-5">
                                            <div class="section-intro">
                                                <h2><?php the_sub_field('main_title'); ?></h2>
                                            </div>
                                            <!-- /.section-intro -->
                                        </div>
                                        <!-- /.col-lg-5 -->
                                        <div class="col-lg-7">
                                            <div class="cities-list">
                                                <div class="cities-list-in">
                                                    <?php the_sub_field('content_block'); ?>
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
                <!-- /#cities-area -->     
                
                <?php elseif( get_row_layout() == 'trailer_types'): ?>

                    <div class="city-single-content city-single-top-content">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="section-intro">
                                        <h2><?php the_field('section_title_city_type_general', 'options'); ?></h2>
                                        <?php the_field('intro_text_trailer_types', 'options'); ?>
                                    </div>
                                    <!-- /.section-intro -->
                                </div>
                                <!-- /.col-md-12 -->
                            </div>
                            <!-- /.row -->
                            <div class="about-items">

                                <?php if( have_rows('content_blocks_types_city', 'options') ): ?>
                                <?php while( have_rows('content_blocks_types_city', 'options') ): the_row(); ?>

                                    <section class="about-item">
                                        <div class="row">
                                            <div class="col-lg-5">
                                                <div class="about-photo">
                                                    <div class="ap-content"></div>
                                                    <!-- /.ap-content -->
                                                    <?php
                                                    $imageID = get_sub_field('featured_image');
                                                    $image = wp_get_attachment_image_src( $imageID, 'thumb-image' );
                                                    $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                                                    ?> 

                                                    <img class="img-responsive ap-photo" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" />                                                     
                                                    <div class="shade"></div>
                                                    <!-- /.shade -->
                                                </div>
                                                <!-- /.about-photo -->
                                            </div>
                                            <!-- /.col-lg-5 -->
                                            <div class="col-lg-7">
                                                <div class="about-content">
                                                   <?php the_sub_field('content_block'); ?>
                                                </div>
                                                <!-- /.about-content -->
                                            </div>
                                            <!-- /.col-lg-7 -->
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
                        <div class="about-rb-shape"></div> 
                    </div>
                    <!-- /city-single-content -->    
                    
                    
                    <?php elseif( get_row_layout() == 'reviews'): ?>

                    <section id="reviews-area">
                        <div class="container">
                            <div class="row">  
                                <div class="col-lg-6">
                                    <div class="section-intro">
                                        <h2><span><?php the_sub_field('section_title'); ?></span></h2>
                                    </div>
                                    <!-- /.section-intro -->
                                </div>
                                <!-- /.col-lg-6 -->
                                <div class="col-lg-6 abs-pos">
                                    <div class="reviews-list">
                                        <div id="reviews-slider">
                                      
                                            <?php
                                                $post_objects = get_sub_field('reviews_list_post');

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
                    
                <?php elseif( get_row_layout() == 'bottom_form'): ?>

                    <section id="bottom-quote" class="enclosed-quote">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="bq-content">
                                        <h2><?php the_sub_field('cta_title'); ?></h2>
                                        <?php the_sub_field('content_block'); ?>
                                    </div>
                                    <!-- /.bq-content -->
                                </div>
                                <!-- /.col-lg-6 -->
                                <div class="col-lg-6">
                                    <div class="quote-form">
                                        <div class="quote-form-in">
                                            <div class="rib"><?php the_field('form_title_quote_single', 'options'); ?>
                                                <div class="shad"></div>
                                            </div>
                                            <?php the_field('form_code_quote_form_single', 'options'); ?>
                                        </div>
                                        <!-- /.quote-form-in -->
                                    </div>
                                    <!-- /.quote-form -->
                                </div>
                                <!-- /.col-lg-6 -->
                            </div>
                            <!-- /.row -->
                        </div>
                        <!-- /.container -->
                    </section>
                    <!-- /#bottom-quote -->                    

            <?php endif; ?>
        <?php endwhile; ?>
    <?php endif; ?>    


<?php
get_footer(); ?>
