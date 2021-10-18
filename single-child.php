<?php
/*
 * Template Name: Parent Child Template
 * Template Post Type: post
 */
  
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

        <?php
        $imageID = get_field('featured_image_blog');
        $image = wp_get_attachment_image_src( $imageID, 'full-image' );
        $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
        ?> 

    <header id="blog-header" class="page-wrapper" style="background-image: url(<?php echo $image[0]; ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_title(); ?></h1>
                            <div class="metas">
                                <span class="date"><?php echo get_the_date( 'F j, Y' ); ?></span> &bull;
                                <?php
                                global $post;
                                $categories = get_the_category($post->ID);
                                $cat_link = get_category_link($categories[0]->cat_ID);
                                echo '<a href="'.$cat_link.'">'.$categories[0]->cat_name.'</a>' 
                                ?>
                                <div class="author-desc">
                                    <?php echo get_avatar( get_the_author_meta( 'ID' ), 60 ); ?>
                                    <div class="author-content">
                                        <a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>"><?php the_author(); ?></a>
                                        <p><?php the_author_description(); ?></p>
                                    </div>
                                    <!-- /.author-content -->
                                </div>           
                            </div>         
                            
                        <?php if( have_rows('list_of_posts_parent') ): ?>
                        <div id="post-nav">
                            <div class="post-wrapper">                           
                                <div id="nav-slider">
                                    
                                        <?php while( have_rows('list_of_posts_parent') ): the_row(); ?>

                                            <div class="item">
                                                <div class="nav-col">
                                                    <a href="<?php the_sub_field('link_to_post'); ?>">
                                                        <div class="icon">
                                                            <img src="<?php the_sub_field('icon'); ?>" alt="">
                                                        </div>
                                                        <span><?php the_sub_field('label'); ?></span>
                                                    </a>
                                                </div>
                                                <!-- // col  -->
                                            </div>

                                        <?php endwhile; ?>
                                    
                                </div>
                                <!-- // nav  -->
                            </div>
                            <!-- // wrapper  -->
                        </div>
                        <!-- // post nav  -->
                        <?php endif; ?>                                
                            
                    </div>
                    <!-- /.header-caption -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>

    <?php if( have_rows('content_layout_blog') ): ?>
        <?php while( have_rows('content_layout_blog') ): the_row(); ?>
            <?php if( get_row_layout() == 'intro_text' ): ?>

                <section id="blog-intro">
                    <div class="intro-topleft-shape"></div> 
                    <div class="bf-top-shape"></div>  
                    <img src="img/ico/stars.png" alt="" class="stars"> 
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <?php the_sub_field('intro_content'); ?>
                            </div>
                            <!-- /.col-md-12 -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container -->
                    <div class="scroll-down"><a href="#toper"><i class="icon-angle-right"></i></a></div>
                    <!-- /.scroll-down -->
                </section>
                <!-- /#blog-intro -->

                <div id="toper"></div>

            <?php elseif( get_row_layout() == 'full_width_content' ): ?>
                

                <div class="blog-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="blog-body-in">
                                    <?php the_sub_field('content_block'); ?>
                                </div>
                                <!-- /.blog-body-in -->
                            </div>
                            <!-- /.col-md-12 -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container -->
                </div>
                <!-- /#blog-body -->       
                
            <?php elseif( get_row_layout() == 'full_width_image' ): ?>

                <div class="blog-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="blog-body-in">
                                    <div class="blog-photo">
                                        <?php
                                        $imageID = get_sub_field('featured_image');
                                        $image = wp_get_attachment_image_src( $imageID, 'full-image');
                                        $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                                        ?> 

                                        <img class="img-responsive" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" /> 
                                        <div class="image__caption">
                                            <span><?php the_sub_field('image_caption'); ?></span>
                                        </div>
                                    </div>      
                                </div>
                            </div>
                            <!-- /.col-md-12 -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container -->
                </div>
                <!-- /#blog-body -->   
                
            <?php elseif( get_row_layout() == 'video' ): ?>

                <div class="blog-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="blog-body-in">
                                    <div class="video-holder">
                                        <?php the_sub_field('embedded_code'); ?>
                                    </div>
                                    <!-- // video  -->          
                                </div>
                            </div>
                            <!-- /.col-md-12 -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container -->
                </div>
                <!-- /#blog-body -->     
                
            <?php elseif( get_row_layout() == 'quote_cta' ): ?>

                <div class="blog-body ptop pbottom">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="blog-body-in">

                                    <div class="quote-cta--blog">
                                        <h3><?php the_sub_field('cta_title'); ?></h3>
                                        <a href="#bottom-quote" class="btn-cta"><?php the_sub_field('button_label'); ?></a>
                                    </div>                                
                                                
                                </div>
                            </div>
                            <!-- /.col-md-12 -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container -->
                </div>
                <!-- /#blog-body --> 
                
                <?php elseif( get_row_layout() == 'featured_article' ): ?>    
                    <?php
                        $post_objects = get_sub_field('featured_article_list');

                        if( $post_objects ): ?>
                            <?php foreach( $post_objects as $post): // variable must be called $post (IMPORTANT) ?>
                                <?php setup_postdata($post); ?>
                                    
                                <div class="featured-article-box">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="blog-box">
                                                    <div class="blog-photo">
                                                        <a href="<?php echo get_permalink(); ?>" target="_blank">
                                                            <?php
                                                            $imageID = get_field('featured_image_blog');
                                                            $image = wp_get_attachment_image_src( $imageID, 'blog-image' );
                                                            $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                                                            ?> 

                                                            <img class="img-responsive ap-photo" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" />                                         
                                                        </a>
                                                    </div>
                                                    <!-- /.blog-photo -->

                                                    <div class="blog-content">
                                                        <h3><a href="<?php echo get_permalink(); ?>" target="_blank"><?php the_title(); ?></a></h3>
                                                        <a href="<?php echo get_permalink(); ?>" class="readmore" target="_blank">Read More</a>
                                                        <!-- /.readmore -->
                                                    </div>
                                                    <!-- /.blog-content -->
                                                </div>
                                                <!-- /.blog-box -->
                                            </div>
                                            <!-- /.col-md-12 -->
                                        </div>
                                        <!-- /.row -->
                                    </div>
                                    <!-- /.container -->
                                </div>
                                <!-- /.featured-article -->
                                    
                            <?php endforeach; ?>
                        <?php wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly ?>
                    <?php endif; ?>
                    <?php wp_reset_postdata(); ?>

                <?php elseif( get_row_layout() == 'table' ): ?>

                    <div class="blog-table-holder">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="blog-table-box">
                                        <table style="width:100%" class="single-table">
                                            <thead>
                                                <tr role="row">
                                                <?php
                                                    // check if the repeater field has rows of data
                                                    if(have_rows('table_head_cells')):
                                                        // loop through the rows of data
                                                        while(have_rows('table_head_cells')) : the_row();
                                                            $hlabel = get_sub_field('table_cell_label_thead');
                                                            ?>  
                                                            <th tabindex="0" rowspan="1" colspan="1"><?php echo $hlabel; ?></th>
                                                        <?php endwhile;
                                                    else :
                                                        echo 'No data';
                                                    endif;
                                                    ?>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <?php while ( have_posts() ) : the_post(); ?>
                                                <?php 
                                                // check for rows (parent repeater)
                                                if( have_rows('table_body_row') ): ?>
                                                    <?php 
                                                    // loop through rows (parent repeater)
                                                    while( have_rows('table_body_row') ): the_row(); ?>
                                                            <?php 
                                                            // check for rows (sub repeater)
                                                            if( have_rows('table_body_cells') ): ?>
                                                                <tr>
                                                                    <?php 
                                                                    // loop through rows (sub repeater)
                                                                    while( have_rows('table_body_cells') ): the_row();
                                                                        ?>
                                                                        <td><?php the_sub_field('table_cell_label_tbody'); ?></td>
                                                                    <?php endwhile; ?>
                                                                </tr>
                                                            <?php endif; //if( get_sub_field('') ): ?>
                                                    <?php endwhile; // while( has_sub_field('') ): ?>
                                                <?php endif; // if( get_field('') ): ?>
                                                <?php endwhile; // end of the loop. ?>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- /.blog-table-box -->
                                </div>
                                <!-- /.col-md-12 -->
                            </div>
                            <!-- /.row -->
                        </div>
                        <!-- /.container -->
                    </div>
                    <!-- /.blog-table-holder -->

                <?php endif; ?>
            <?php endwhile; ?>
        <?php endif; ?>    


    <section id="bottom-quote" class="enclosed-quote full-quote">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-md-2">
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

    <section id="related-posts" class="first-child-box">
        <h2>Recent Posts</h2>
        <div class="container">
            <div class="row offer-boxes">

                <?php
                        $loop = new WP_Query( array( 'post_type' => 'post', 'posts_per_page' => 3, 'ignore_sticky_posts'=>1) ); ?>  
                        <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

                    <div class="col-md-4">
                        <div class="offer-box">
                            <?php
                            $imageID = get_field('featured_image_blog');
                            $image = wp_get_attachment_image_src( $imageID, 'blog-image' );
                            $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                            ?> 

                            <img class="img-responsive" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" /> 
                            <div class="ob-content">
                                <h3><?php the_title(); ?></h3>
                                <a href="<?php echo get_permalink(); ?>" class="readmore">Read More</a>
                            </div>
                            <!-- /.ob-content -->
                        </div>
                        <!-- /.offer-box -->
                    </div>
                    <!-- /.col-md-4 -->

                    <?php endwhile; ?>
                        <?php wp_reset_postdata(); ?>    
                    <?php wp_reset_query(); ?>

            </div>
            <!-- /.row offer-boxes -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#related-posts -->

    <section id="related-posts">
        <h2>Related Posts</h2>
        <div class="container">
            <div class="row offer-boxes">

                <?php $orig_post = $post;
                global $post;
                $categories = get_the_category($post->ID);
                if ($categories) {
                $category_ids = array();
                foreach($categories as $individual_category) $category_ids[] = $individual_category->term_id;

                $args=array(
                'category__in' => $category_ids,
                'post__not_in' => array($post->ID),
                'posts_per_page'=> 3, // Number of related posts that will be shown.
                'ignore_sticky_posts'=>1
                );

                $my_query = new wp_query( $args );
                if( $my_query->have_posts() ) {
                while( $my_query->have_posts() ) {
                $my_query->the_post();?>

                    <div class="col-md-4">
                        <div class="offer-box">
                            <?php
                            $imageID = get_field('featured_image_blog');
                            $image = wp_get_attachment_image_src( $imageID, 'blog-image' );
                            $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                            ?> 

                            <img class="img-responsive" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" /> 
                            <div class="ob-content">
                                <h3><?php the_title(); ?>r</h3>
                                <a href="<?php echo get_permalink(); ?>" class="readmore">Read More</a>
                            </div>
                            <!-- /.ob-content -->
                        </div>
                        <!-- /.offer-box -->
                    </div>
                    <!-- /.col-md-4 -->

                <?
                }
                }
                }
                $post = $orig_post;
                wp_reset_query(); ?>

            </div>
            <!-- /.row offer-boxes -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#related-posts -->

<?php
get_footer(); ?>
