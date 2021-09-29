<?php
/**
 * Template Name: About Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

<header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_about_header'); ?>);">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="header-caption">
                    <h1><?php the_field('main_title_about_header'); ?></h1>
                    <?php the_field('hero_text_about_heder'); ?>
                </div>
                <!-- /.header-caption -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</header>
<section id="about-intro-area">
    <div class="intro-topleft-shape"></div>    
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="about-intro-content">
                    <h2><?php the_field('section_title_about_intro'); ?></h2>
					<?php the_field('intro_text_about_intro'); ?>
                </div>
                <!-- /.about-intro-content -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
    <div class="scroll-down"><a href="#about-main"><i class="icon-angle-right"></i></a></div>
    <!-- /.scroll-down -->
</section>
<!-- /#about-intro-area -->

<div id="about-main">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-intro">
                    <h2><?php the_field('section_title_main_about'); ?></h2>
                </div>
                <!-- /.section-intro -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
        <div class="about-items">

		<?php if( have_rows('content_blocks_main_about') ): ?>
			<?php while( have_rows('content_blocks_main_about') ): the_row(); ?>

				<section class="about-item">
					<div class="row">
						<div class="col-lg-5">
							<div class="about-photo">
								<div class="ap-content"></div>
								<!-- /.ap-content -->
								<img src="<?php the_sub_field('featured_image'); ?>" alt="" class="ap-photo">
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

				<?php if (get_sub_field('arrow_type') == 'Arrow Right') { ?>
					<img src="<?php bloginfo('template_directory'); ?>/img/ico/custom-arrow-rd.png" alt="" class="custom-arrow">
				<?php } elseif (get_sub_field('arrow_type') == 'Arrow Left') { ?>
					<img src="<?php bloginfo('template_directory'); ?>/img/ico/custom-arrow-ld.png" alt="" class="custom-arrow">
				<?php } ?>   				

			<?php endwhile; ?>
		<?php endif; ?>

        </div>
        <!-- /.about-items -->

        <div class="about-ctas">
            <div class="row">

				<?php if( have_rows('cta_blocks_about') ): ?>
					<?php while( have_rows('cta_blocks_about') ): the_row(); ?>

						<div class="col-lg-6">
							<div class="about-photo" style="background-image: url(<?php the_sub_field('background_image'); ?>)">
								<div class="ap-content">
									<div class="ap-text">
										<?php the_sub_field('content_block'); ?>
									</div>
									<!-- /.ap-text -->
								</div>
								<!-- /.ap-content -->
							</div>
							<!-- /.about-photo -->
						</div>
						<!-- /.col-lg-6 -->

					<?php endwhile; ?>
				<?php endif; ?>

            </div>
            <!-- /.row -->
        </div>
        <!-- /.about-ctas -->
    </div>
    <!-- /.container -->
    <div class="about-bottom-shade"></div>
    <div class="about-rb-shape"></div> 
</div>
<!-- /#about-main -->
<section id="cities-area" style="background-image: url(<?php the_field('background_image_proces_about'); ?>);">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="cities-area-in">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="section-intro">
                                <h2><?php the_field('section_title_process_about'); ?></h2>
                                <p><?php the_field('section_subtitle_process_about'); ?></p>
                            </div>
                            <!-- /.section-intro -->
                        </div>
                        <!-- /.col-lg-5 -->

                        <div class="col-lg-7">
                            <div class="cities-list">
                                <div class="cities-list-in" id="process-slider">

                                    <?php if( have_rows('process_list_about_page') ): ?>
                                    <?php while( have_rows('process_list_about_page') ): the_row(); ?>

                                        <div>
                                           <?php the_sub_field('step_content'); ?>
                                        </div>

                                    <?php endwhile; ?>
                                    <?php endif; ?>

                                </div>
                                <!-- /.cities-list-in -->
                            </div>
                            <!-- /.cities-list -->
                            <div class="slider-nav">
                                <div class="btn-prev">
                                    <a href="#">PREVIOUS STEP</a>
                                </div>
                                <!-- /.btn-next -->
                                <div class="btn-next">
                                    <a href="#">NEXT STEP</a>
                                </div>
                                <!-- /.btn-next -->
                            </div>
                            <!-- /.slider-nav -->
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
<section id="costs-area-about">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-intro">
                    <h2><?php the_field('section_title_why_about'); ?></h2>
                    <?php the_field('intro_text_why_about'); ?>
                </div>
                <!-- /.section-intro -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
        <div class="row costs-boxes">

            <?php if( have_rows('why_blocks_about') ): ?>
                <?php while( have_rows('why_blocks_about') ): the_row(); ?>

                    <div class="col-lg-4 col-md-6">
                        <div class="cost-box">
                            <img src="<?php the_sub_field('icon'); ?>" alt="">
                            <h3><?php the_sub_field('title'); ?></h3>
                            <p><?php the_sub_field('text'); ?></p>
                        </div>
                        <!-- /.cost-box -->
                    </div>
                    <!-- /.col-lg-4 col-md-6 -->

                <?php endwhile; ?>
            <?php endif; ?>

            <div class="col-lg-4 col-md-6">
                <div class="cost-box" style="background-image: url(<?php the_field('background_image_why_cta'); ?>)">
                    <div class="cb-content">
                        <h3><?php the_field('block_title_cta_why'); ?></h3>
                        <a href="<?php the_field('button_link_why_cta'); ?>" class="costs-btn"><?php the_field('button_label_why_cta'); ?></a>
                    </div>
                    <!-- /.cb-content -->
                </div>
                <!-- /.cost-box -->
            </div>
            <!-- /.col-lg-4 col-md-6 -->
        </div>
        <!-- /.row costs-boxes -->
    </div>
    <!-- /.container -->
</section>
<!-- /#costs-area -->

<section id="reviews-area">
    <div class="container">
        <div class="row">  
            <div class="col-lg-6">
                <div class="section-intro">
                    <h2><?php the_field('section_title_rev_about'); ?></h2>
                    <?php the_field('intro_text_test_about'); ?>
                    <!--<a href="#" class="read-all">Read All</a>-->
                </div>
                <!-- /.section-intro -->
            </div>
            <!-- /.col-lg-6 -->
            <div class="col-lg-6 abs-pos">
                <div class="reviews-list">
                    <div id="reviews-slider">

                            <?php
                                $post_objects = get_field('list_of_reviews_about_page');

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

<section id="offer-area">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-intro">
                    <h2><?php the_field('section_title_hat_about'); ?></h2>
                    <?php the_field('intro_text_what_about'); ?>
                </div>
                <!-- /.section-intro -->
            </div>
            <!-- /.col-md-12 -->
            <div class="row offer-boxes">

                <?php if( have_rows('offer_boxes_repe') ): ?>
                    <?php while( have_rows('offer_boxes_repe') ): the_row(); ?>

                        <div class="col-md-4">
                            <div class="offer-box">
                                <img src="<?php the_sub_field('featured_image'); ?>" alt="">
                                <div class="ob-content">
                                    <h3><?php the_sub_field('title'); ?></h3>
                                    <p><?php the_sub_field('text'); ?></p>
                                </div>
                                <!-- /.ob-content -->
                            </div>
                            <!-- /.offer-box -->
                        </div>
                        <!-- /.col-md-4 -->

                    <?php endwhile; ?>
                <?php endif; ?>

            </div>
            <!-- /.row offer-boxes -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</section>
<!-- /#offer-area -->

<section id="bottom-quote">
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="bq-content">
                    <h2><?php the_field('section_title_quote_about'); ?></h2>
                    <?php the_field('content_block_quote_about'); ?>
                </div>
                <!-- /.bq-content -->
            </div>
            <!-- /.col-lg-6 -->
            <div class="col-lg-6">
                <div class="quote-form">
                    <div class="quote-form-in">
                        <div class="rib"><?php the_field('form_title_quote_about'); ?>
                            <div class="shad"></div>
                        </div>
                        <?php the_field('form_code_quote_about'); ?>
                        <form action="">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">Name</label>
                                        <input type="text" placeholder="Full Name">
                                    </div>
                                    <!-- /.form-group -->
                                </div>
                                <!-- /.col-md-12 -->
                            </div>
                            <!-- /.row -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">Phone</label>
                                        <input type="tel" placeholder="_-___-__-__">
                                    </div>
                                    <!-- /.form-group -->
                                </div>
                                <!-- /.col-md-12 -->
                            </div>
                            <!-- /.row -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">E-mail</label>
                                        <input type="email" placeholder="someone@gmail.com">
                                    </div>
                                    <!-- /.form-group -->
                                </div>
                                <!-- /.col-md-12 -->
                                
                            </div>
                            <!-- /.row -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group date-area">
                                        <label for="">Move Date</label>
                                        <input type="text" placeholder="yyy-mm-dd" class="date-picker-input">
                                        <i class="icon-calendar-alt"></i>
                                    </div>
                                    <!-- /.form-group -->
                                </div>
                                <!-- /.col-md-12 -->
                            </div>
                            <!-- /.row -->
                            <div class="row">
                                <div class="col-md-12">
                                    <button type="submit">Get Started Today</button>
                                </div>
                                <!-- /.col-md-12 -->
                            </div>
                            <!-- /.row -->
                        </form>
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

<?php get_footer(); ?>
