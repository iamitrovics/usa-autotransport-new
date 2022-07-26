<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package CodeFavorite_Starter_Theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<link rel="icon" type="image/png"  href="<?php echo get_template_directory_uri(); ?>/img/ico/favicon.png">

    <meta name="google-site-verification" content="5y3eCIjUV_edDxUKVDlSF_q9oHPC1y-UWt-TS6hrmwQ" />

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KB5X64F');</script>
    <!-- End Google Tag Manager -->


	<?php if( get_field('head_code_snippet', 'options') ): ?>
		<?php the_field('head_code_snippet', 'options'); ?>
	<?php endif; ?>

	<?php if ( is_singular( array('cities', 'post') ) ) { ?>
        
        <?php if( get_field('general_schema_schema', 'options') ): ?>
            <?php the_field('general_schema_schema', 'options'); ?>
        <?php endif; ?>    

    <?php } elseif (is_page_template('page-templates/reviews-template.php')) { ?>
        
        <?php if( get_field('general_schema_schema', 'options') ): ?>
            <?php the_field('general_schema_schema', 'options'); ?>
        <?php endif; ?>    

	<?php } else { ?>

        <?php if( get_field('general_schema_with_reviews', 'options') ): ?>
            <?php the_field('general_schema_with_reviews', 'options'); ?>
        <?php endif; ?>    

	<?php } ?>      

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KB5X64F"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->    

	<?php if( get_field('body_code_snippet', 'options') ): ?>
		<?php the_field('body_code_snippet', 'options'); ?>
	<?php endif; ?>

	<div class="menu-overlay"></div>
	<div class="main-menu-sidebar visible-xs visible-sm visible-md" id="menu">

		<header>
			<a href="javascript:;" class="close-menu-btn"><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg></a>
		</header>
		<!-- // header  -->

		<nav id="sidebar-menu-wrapper">
			<div id="menu">    
				<ul class="nav-links">
					<?php
					wp_nav_menu( array(
						'menu'              => 'mobile_menu',
						'theme_location'    => 'mobile_menu',
						'depth'             => 2,
						'container'         => false,
						'container_class'   => 'collapse navbar-collapse',
						'container_id'      => false,
						'menu_class'        => 'nav navbar-nav',
						'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
						'items_wrap' => '%3$s',
						'walker'            => new wp_bootstrap_navwalkermobile())
					);
					?>  
				</ul>
			</div>
			<!-- // menu  -->
		</nav> 
		<!-- // sidebar menu wrapper  -->

        <footer>
            <a href="<?php bloginfo('url'); ?>/get-a-quote/" class="btn-cta">Get a Quote</a>
        </footer>

	</div>
	<!-- // main menu sidebar  -->		

	<div id="menu_area" class="menu-area">
            <div id="menu-wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <nav class="navbar navbar-light navbar-expand-lg mainmenu">
                                <a class="navbar-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php the_field('website_logo_general', 'options'); ?>" alt=""></a>
                                <!-- /.navbar-brand -->
                                <div class="collapse navbar-collapse">
                                    <ul class="navbar-nav ml-auto">

                                        <?php if( have_rows('desktop_items', 'options') ): ?>
                                        <?php while( have_rows('desktop_items', 'options') ): the_row(); ?>

                                            <?php if (get_sub_field('type_of_link') == 'Single item') { ?>

                                                <li><a href="<?php the_sub_field('link_to_page'); ?>"><?php the_sub_field('item_label'); ?></a></li>                                                

                                            <?php } elseif (get_sub_field('type_of_link') == 'Dropdown') { ?>

                                                <li class="dropdown">
                                                    <a class="dropdown-toggle" href="<?php the_sub_field('link_to_page'); ?>"><?php the_sub_field('item_label'); ?></a>
                                                    <ul class="dropdown-menu fade" aria-labelledby="navbarDropdown">
                                                        <?php if( have_rows('dropdown_items') ): ?>
                                                        <?php while( have_rows('dropdown_items') ): the_row(); ?>
                                                            <li><a href="<?php the_sub_field('item'); ?>"><?php the_sub_field('label'); ?></a></li>
                                                        <?php endwhile; ?>
                                                        <?php endif; ?>
                                                    </ul>
                                                </li>                                                

                                            <?php } elseif (get_sub_field('type_of_link') == 'Multi Column') { ?>

                                        <li class="dropdown  full-width">
                                            <a class="dropdown-toggle" href="<?php the_sub_field('link_to_page'); ?>" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><?php the_sub_field('item_label'); ?></a>
                                            <ul class="dropdown-menu fade" aria-labelledby="navbarDropdown">
                                                <?php if( have_rows('multi_items') ): ?>
                                                <?php while( have_rows('multi_items') ): the_row(); ?>

                                                    <li><a href="<?php the_sub_field('link_to_page'); ?>"><?php the_sub_field('label'); ?></a></li>

                                                <?php endwhile; ?>
                                                <?php endif; ?>

                                            </ul>
                                        </li>                                                

                                            <?php } ?>   

                                        <?php endwhile; ?>
                                        <?php endif; ?>

                                    </ul>
                                    <!-- /.navbar-nav -->
                                    <div class="call-btn">

                                    <?php 
                                    $values = get_field( 'phone_number_hero_city' );
                                    if ( $values ) { ?>
                                        <a href="tel:<?php the_field('phone_number_hero_city'); ?>"><i class="fas fa-phone-alt"></i> <?php the_field('phone_number_hero_city'); ?></a>
                                    <?php 
                                    } else { ?>
                                        <a href="tel:<?php the_field('main_phone_number_options', 'options'); ?>"><i class="fas fa-phone-alt"></i> <?php the_field('main_phone_number_options', 'options'); ?></a>
                                    <?php } ?>
                                        
                                    </div>
                                    <!-- /.call-btn -->
                                    <div id="top__mobile">
                                        <a href="javascript:;" class="menu-btn">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </a>
                                    </div>
                                    <!-- /#top__mobile -->
                                </div>
                                <!-- /.navbar-collapse -->
                            </nav>
                            <!-- /.mainmenu -->
                        </div>
                        <!-- /.col-md-12 -->
                    </div>
                    <!-- /.row -->
                </div>
                <!-- /.continer -->
            </div>
            <!-- /#menu-wrapper -->
        </div>
        <!-- // desktop menu  -->
            