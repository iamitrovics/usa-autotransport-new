<?php get_header(); ?>

    <header id="masheader" class="page-wrapper" style="background-image: url(<?php the_field('hero_background_home'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('hero_title_home'); ?></h1>
                        <p><?php the_field('hero_subtitle_home'); ?></p>
                    </div>
                    <!-- /.header-caption -->
                    <?php include(TEMPLATEPATH . '/inc/inc_quote_form.php'); ?>
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>
    <section id="intro-area">
        <div class="intro-topleft-shape"></div>    
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_why_home'); ?></h2>
                        <p><?php the_field('section_subtitle_why_home'); ?></p>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <div class="row feature-items">
                <?php if( have_rows('why_blocks_home') ): ?>
                    <?php while( have_rows('why_blocks_home') ): the_row(); ?>

                        <div class="col-md-4">
                            <div class="feature-item">
                                <img src="<?php the_sub_field('icon'); ?>" alt="">
                                <h3><?php the_sub_field('title'); ?></h3>
                            </div>
                            <!-- /.feature-item -->
                        </div>
                        <!-- /.col-md-4 -->

                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
            <!-- /.row feature-items -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#intro-area -->
    <div id="about-area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_about_home'); ?></h2>
                        <p><?php the_field('section_subtitle_about_home'); ?></p>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <div class="about-items">
                <section class="about-item">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="about-photo overlayed" style="background-image: url(<?php the_field('about_background_home'); ?>);">
                                <div class="ap-content">
                                    <div class="ap-heading">
                                        <img src="<?php the_field('about_icon_home'); ?>" alt="" class="ap-ico">
                                        <div class="aph-txt">
                                            <?php the_field('intro_text_about_home'); ?>
                                        </div>
                                        <!-- /.aph-txt -->
                                    </div>
                                    <!-- /.ap-heading -->
                                    <div class="ap-text">
                                        <?php the_field('about_text_home_left'); ?>
                                    </div>
                                    <!-- /.ap-text -->
                                </div>
                                <!-- /.ap-content -->
                                <div class="shade"></div>
                                <!-- /.shade -->
                            </div>
                            <!-- /.about-photo -->
                        </div>
                        <!-- /.col-lg-5 -->
                        <div class="col-lg-7">
                            <div class="about-content">
                                <?php the_field('about_main_content_home'); ?>
                            </div>
                            <!-- /.about-content -->
                        </div>
                        <!-- /.col-lg-7 -->
                    </div>
                    <!-- /.row -->
                </section>
                <!-- /.about-item -->

                <?php if( have_rows('content_blocks_about_home') ): ?>
                    <?php while( have_rows('content_blocks_about_home') ): the_row(); ?>

                        <section class="about-item">
                            <div class="row">
                                <div class="col-lg-5">
                                    <div class="about-photo">
                                        <div class="ap-content"></div>
                                        <?php if( get_sub_field('button_label') ): ?>
                                        <div class="ap-cta">
                                            <a href="<?php the_sub_field('button_link'); ?>"><?php the_sub_field('button_label'); ?></a>
                                        </div>
                                        <!-- /.ap-cta -->         
                                        <?php endif; ?>                               
                                        <!-- /.ap-content -->
                                        <?php
                                        $imageID = get_sub_field('featured_image');
                                        $image = wp_get_attachment_image_src( $imageID, 'about-image' );
                                        $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                                        ?> 

                                        <img class="ap-photo" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" />                                         
                                        <div class="shade"></div>
                                        <!-- /.shade -->
                                    </div>
                                    <!-- /.about-photo -->
                                </div>
                                <!-- /.col-lg-5 -->
                                <div class="col-lg-7">
                                    <div class="about-content">
                                        <h3><?php the_sub_field('block_title'); ?></h3>
                                        <?php the_sub_field('text_block'); ?>
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
        <div class="about-bottom-shade"></div>
        <div class="about-rb-shape"></div> 
    </div>
    <!-- /#about-area -->
    <section id="cities-area" style="background-image: url(<?php the_field('background_image_cities_home'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="cities-area-in">
                        <div class="row">
                            <div class="col-lg-5">
                                <div class="section-intro">
                                    <h2><?php the_field('section_title_cities_home'); ?></h2>
                                    <p><?php the_field('section_subtitle_home_cities'); ?></p>
                                    <a href="<?php the_field('button_link_cities_home'); ?>" class="si-btn"><?php the_field('button_label_cities_home'); ?></a>
                                    <!-- /.si-btn -->
                                </div>
                                <!-- /.section-intro -->
                            </div>
                            <!-- /.col-lg-5 -->
                            <div class="col-lg-7">
                                <div class="cities-list">
                                    <div id="cities-slider">
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
                                    <!-- /#cities-slider -->
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
    <section id="trailer-types">
        <div class="container">

            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_trailer_home'); ?></h2>
                        <?php the_field('intro_text_trailer_home'); ?>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->

            <div class="row trailer-cats">

                <div class="col-md-6">
                    <div class="trailer-cat">
                        <?php
                        $imageID = get_field('featured_image_open_air');
                        $image = wp_get_attachment_image_src( $imageID, 'about-image' );
                        $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                        ?> 

                        <img class="img-responsive" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" /> 
                        <div class="tc-cta">
                            <h3><?php the_field('block_title_open_air'); ?></h3>
                            <a href="<?php the_field('button_link_open_trailer'); ?>" class="url-wrapper"><?php the_field('button_label_open_air'); ?></a>
                        </div>
                        <!-- /.tc-cta -->
                        
                    </div>
                    <!-- /.trailer-cat -->
                </div>
                <!-- /.col-md-6 -->

                <span class="vs-circle">VS.</span>

                <!-- /.vs-circle -->
                <div class="col-md-6">
                    <div class="trailer-cat">
                        <?php
                        $imageID = get_field('featured_image_closed');
                        $image = wp_get_attachment_image_src( $imageID, 'about-image' );
                        $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                        ?> 

                        <img class="img-responsive" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" /> 
                        <div class="tc-cta">
                            <h3><?php the_field('block_title_enclosed'); ?></h3>
                            <a href="<?php the_field('button_lnik_enclosed'); ?>" class="url-wrapper"><?php the_field('button_label_enclosed'); ?></a>
                        </div>
                        <!-- /.tc-cta -->
                    </div>
                    <!-- /.trailer-cat -->
                </div>
                <!-- /.col-md-6 -->
                
            </div>
            <!-- /.row trailer-cats -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#trailer-types -->
    <section id="reviews-area">
        <div class="container">
            <div class="row">  
                <div class="col-lg-6">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_reviews_home'); ?></h2>
                        <?php the_field('intro_text_reviews_home'); ?>
                        <a href="<?php the_field('button_link_review_home'); ?>" class="read-all"><?php the_field('button_label_reviews_home'); ?></a>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-lg-6 -->
                <div class="col-lg-6 abs-pos">
                    <div class="reviews-list">
                        <div id="reviews-slider">

                            <?php
                                $post_objects = get_field('reviews_list_home');

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

    <section id="costs-area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_ship_car'); ?></h2>
                        <?php the_field('intro_text_ship_car'); ?>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <div class="row costs-boxes">
                <?php if( have_rows('content_blocks_repe_cost') ): ?>
                    <?php while( have_rows('content_blocks_repe_cost') ): the_row(); ?>

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
            </div>
            <!-- /.row costs-boxes -->
            <div class="row">
                <div class="col-md-12 costs-btn ">
                    <a href="<?php the_field('button_link_ship_car'); ?>"><?php the_field('button_label_ship_car'); ?></a>
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#costs-area -->

    <section id="faq-area" style="background-image: url(<?php the_field('background_image_faq_home'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-lg-5">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_faq_home'); ?></h2>
                        <?php the_field('intro_text_faq_home'); ?>
                        <a href="<?php the_field('button_link_fq_home'); ?>" class="faq-btn"><?php the_field('button_label_faq_home'); ?></a>
                        <!-- /.si-btn -->
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-lg-5 -->
                <div class="col-lg-7">
                    <div class="faq__accordion">
                        <?php if( have_rows('faq_list_home') ): ?>
                            <?php while( have_rows('faq_list_home') ): the_row(); ?>

                                <div class="faq-wrap">
                                    <h3 class="accordion-heading"><?php the_sub_field('question'); ?></h3>
                                    <div class="content">
                                        <?php the_sub_field('answer'); ?>
                                    </div>
                                </div>

                            <?php endwhile; ?>
                        <?php endif; ?>
                    </div>
                    <!-- /.faq__accordion -->
                </div>
                <!-- /.col-lg-7 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#faq-area -->

    <section id="history-area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_history_home'); ?></h2>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
        <div class="container hide-mob">
            <div class="row">
                <div class="col-md-12">
                    <div class="upper-content">
                        <div class="timeline-year">1950</div>
                        <div class="timeline-year">1960</div>
                        <div class="timeline-year">1970</div>
                        <div class="timeline-item">
                            <p>When automakers started selling millions of vehicles car haulers needed to be more reliable and able to handle some of the toughest road conditions. Low oil prices gave incentives for enthusiasts to buy popular big pickups and SUVs so the size of the haulers itself needed to increase. </p>
                            <img src="<?php bloginfo('template_directory'); ?>/img/misc/history2.webp" alt="">
                        </div>
                        <!-- /.timeline-item -->
                        <div class="timeline-year">2000</div>
                        <div class="timeline-year">2010</div>
                        <div class="timeline-year">2020</div>
                    </div>
                    <!-- /.upper-content -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->

            <span class="timeline-divider"></span>

            <div class="row">
                
                <div class="col-md-12">
                    <div class="bottom-content">
                        <div class="timeline-item">
                            <img src="<?php bloginfo('template_directory'); ?>/img/misc/history1.webp" alt="">
                            <p>Big changes were taking place in automobile and auto transportation industry. From introducing a safety belt to making cars more cost efficient and affordable, the car industry has bloomed and 83-foot car carriers capable of carrying 12 automobiles were developed.</p>
                        </div>
                        <!-- /.timeline-item -->
                        <div class="timeline-year">1980</div>
                        <div class="timeline-year">1990</div>
                        <div class="timeline-item">
                            <img src="<?php bloginfo('template_directory'); ?>/img/misc/history3.webp" alt="">
                            <p>Today, auto transport doesn’t consist only of shipping new cars from manufacturers. With job market opening up, more and more people are ready to relocate and transport their vehicles to pursue new opportunities. </p>
                        </div>
                        <!-- /.timeline-item -->
                    </div>
                    <!-- /.timeline-area -->
                </div>
                <!-- /.col-md-12 -->

            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
        <div class="container show-mob">
            <div class="row">
                <div class="col-md-12">
                    <div id="timeline-slider">
                        <div class="timeline-item">
                            <img src="<?php bloginfo('template_directory'); ?>/img/misc/history1.webp" alt="">
                            <span class="year">1960-70's</span>
                            <p>Big changes were taking place in automobile and auto transportation industry. From introducing a safety belt to making cars more cost efficient and affordable, the car industry has bloomed and 83-foot car carriers capable of carrying 12 automobiles were developed.</p>
                        </div>
                        <!-- /.timeline-item -->
                        <div class="timeline-item">
                            <img src="<?php bloginfo('template_directory'); ?>/img/misc/history2.webp" alt="">
                            <span class="year">1980-90's</span>
                            <p>When automakers started selling millions of vehicles car haulers needed to be more reliable and able to handle some of the toughest road conditions. Low oil prices gave incentives for enthusiasts to buy popular big pickups and SUVs so the size of the haulers itself needed to increase. </p>
                        </div>
                        <!-- /.timeline-item -->
                        <div class="timeline-item">
                            <img src="<?php bloginfo('template_directory'); ?>/img/misc/history3.webp" alt="">
                            <span class="year">2000-2010's</span>
                            <p>Today, auto transport doesn’t consist only of shipping new cars from manufacturers. With job market opening up, more and more people are ready to relocate and transport their vehicles to pursue new opportunities. </p>
                        </div>
                        <!-- /.timeline-item -->
                    </div>
                    <!-- /#timeline-slider -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#history-area -->  

<?php get_footer(''); ?>

