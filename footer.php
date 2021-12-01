<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package CodeFavorite_Starter_Theme
 */

?>

    <footer id="page-footer">
        <div class="footer-top">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="footer-logo">
                            <img src="<?php the_field('footer_logo_footer', 'options'); ?>" alt="<?php bloginfo('name'); ?>">
                        </div>
                        <!-- /.footer-logo -->
                        <div class="footer-socials">
                            <ul>

                            <?php if( have_rows('social_networks_general', 'options') ): ?>
                                <?php while( have_rows('social_networks_general', 'options') ): the_row(); ?>

                                <li>
                                    <a href="<?php the_sub_field('link_to_network'); ?>" target="_blank"><?php the_sub_field('icon_code'); ?></a>
                                </li>

                                <?php endwhile; ?>
                            <?php endif; ?>

                            </ul>
                        </div>
                        <!-- /.footer-socials -->
                    </div>
                    <!-- /.col-md-12 -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container -->
        </div>
        <!-- /.footer-top -->
        <div class="footer-middle">
            <div class="container">
                <div class="row">
                    <div class="col-xl-5 col-lg-4 col-md-6">
                        <div class="info-block">
                            <p><strong><?php the_field('company_name_footer', 'options'); ?></strong></p>
                            <div class="contact-block">
                                <p><a href="tel:<?php the_field('phone_number_footer', 'options'); ?>"><i class="icon-phone-alt"></i> <?php the_field('phone_number_footer', 'options'); ?></a></p>
                                <p><a href="mailto:<?php the_field('email_address_footer', 'options'); ?>"><i class="icon-envelope"></i> <?php the_field('email_address_footer', 'options'); ?></a></p>
                            </div>
                            <!-- /.contact-block -->
                        </div>
                        <!-- /.info-block -->
                    </div>
                    <!-- /.col-xl-5 col-lg-4 col-md-6 -->
                    <div class="col-xl-3 col-lg-4 col-md-6">
                        <div class="footer-sitemap">
                            <?php wp_nav_menu( array( 'theme_location' => 'footer_menu' ) ); ?>
                        </div>
                        <!-- /.footer-sitemap -->
                    </div>
                    <!-- /.col-xl-3 col-lg-4 col-md-6 -->
                    <div class="col-xl-4 col-lg-4 col-md-6">
                        <div class="footer-newsletter">
                            <span class="nl-title"><?php the_field('bloc_ktitle_nl', 'options'); ?></span>
                            <form action="">
                                <input type="email" placeholder="someone@gmail.com">
                                <button type="submit">Sign Up</button>
                            </form>
                        </div>
                        <!-- /.footer-newsletter -->
                    </div>
                    <!-- /.col-xl-4 col-lg-4 col-md-6 -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container -->
        </div>
        <!-- /.footer-middle -->
        <div class="copybar">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <small><?php the_field('copyright_notice_footer', 'options'); ?></small>
                    </div>
                    <!-- /.col-md-12 -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container -->
        </div>
        <!-- /.copybar -->
        
    </footer>
    <!-- /#page-footer -->

    <div id="cookie-notice">
        <div id="cookie-notice-in">
            <div class="notice-text">
                <?php the_field('notice_text_cookies', 'options'); ?>
            </div>
            <!-- /.notice-text -->
            <div class="notice-btns">
                <a href="#" id="accept-cookie"><?php the_field('button_1_label_cookies' , 'options'); ?></a>
                <a href="<?php the_field('button_link_cooke_2' , 'options'); ?>" target="_blank" id="more-info-cookie"><?php the_field('button_2_label_cooki', 'options'); ?></a>
            </div>
            <!-- /.notice-btns -->
            <a href="javascript:void(0);" id="close-notice"></a>
        </div>
        <!-- /#cookie-notice-in -->
    </div>
    <!-- /#cookie-notice -->

    <div class="modal-overlay disclaimer-modal" data-my-element="tooltip-modal">
        <div class="modal" data-my-element="tooltip-modal">
            <a class="close-modal">
                <img src="<?php bloginfo('template_directory'); ?>/img/ico/close.svg" alt="">
            </a>
            <!-- close modal -->
            <div class="disclaimer-modal-wrap">
                <?php the_field('tooltip_content_modal', 'options'); ?>
            </div>
            <!-- /.disclaimer-modal-wrap -->
        </div>
        <!-- modal -->
    </div>    


    
    <?php 
    $values = get_field( 'phone_number_hero_city' );
    if ( $values ) { ?>

        <div id="fixed-cta">
            
            <a href="tel:<?php the_field('phone_number_hero_city') ?>">
                <em><i class="fal fa-phone-alt"></i></em>
                <div class="phone-text">
                    <small class="label">Get a Free Estimate</small>
                    <span><?php the_field('phone_number_hero_city') ?></span>
                </div>
                <!-- // text  -->
            </a>

        </div>
        <!-- // fixed cta  -->	

    <?php 
    } else { ?>

        <div id="fixed-cta">
            
            <a href="tel:<?php the_field('main_phone_number_options', 'options') ?>">
                <em><i class="fal fa-phone-alt"></i></em>
                <div class="phone-text">
                    <small class="label">Get a Free Estimate</small>
                    <span><?php the_field('main_phone_number_options', 'options') ?></span>
                </div>
                <!-- // text  -->
            </a>

        </div>
        <!-- // fixed cta  -->	

    <?php } ?>    


<?php wp_footer(); ?>

	<?php if( get_field('footer_code_snippet', 'options') ): ?>
		<?php the_field('footer_code_snippet', 'options'); ?>
	<?php endif; ?>
    

    <script>
        
        //cookie notice
        jQuery('#cookie-notice').addClass('slide-up');

        jQuery('#close-notice, #accept-cookie').click(function (e) {
            e.preventDefault();
            jQuery("#cookie-notice").removeClass("slide-up");
            jQuery("#cookie-notice").addClass("slide-down");
        });

    </script>

</body>
</html>
