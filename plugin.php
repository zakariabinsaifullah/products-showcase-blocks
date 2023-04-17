<?php
/**
 * Plugin Name:       Product Showcase Blocks
 * Description:       A collection of custom Gutenberg Blocks developed with native components to showcase product reviews.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Zakaria Binsaifullah
 * Author URI:        https://makegutenblock.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       product-showcase-blocks
 *
 * @package           @wordpress/create-block 
 */

 /**
  * @package Zero Configuration with @wordpress/create-block
  *  [pscb] && [PSCB] ===> Prefix
  */

// Stop Direct Access 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blocks Final Class
 */

final class PSCB_BLOCKS_CLASS {
	public function __construct() {

		// define constants
		$this->pscb_define_constants();

		// block initialization
		add_action( 'init', [ $this, 'pscb_blocks_init' ] );

		// blocks category
		if( version_compare( $GLOBALS['wp_version'], '5.7', '<' ) ) {
			add_filter( 'block_categories', [ $this, 'pscb_register_block_category' ], 10, 2 );
		} else {
			add_filter( 'block_categories_all', [ $this, 'pscb_register_block_category' ], 10, 2 );
		}

		// enqueue block assets
		add_action( 'enqueue_block_assets', [ $this, 'pscb_external_libraries' ] );
	}

	/**
	 * Initialize the plugin
	 */

	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Define the plugin constants
	 */
	private function pscb_define_constants() {
		define( 'PSCB_VERSION', '1.0.0' );
		define( 'PSCB_URL', plugin_dir_url( __FILE__ ) );
		define( 'PSCB_INC_URL', PSCB_URL . 'includes/' );		
	}

	/**
	 * Register Inline style
	 */
	public function pscb_register_inline_style( $id, $css ) {
		wp_register_style( $id, false );
		wp_enqueue_style( $id );
		wp_add_inline_style( $id, $css );
	}

	/**
	 * Blocks Registration 
	 */

	public function pscb_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/blocks/' . $name, $options );
	 }

	/**
	 * Blocks Initialization
	*/
	public function pscb_blocks_init() {
		// register single block

		$this->pscb_register_block( 'review', [
			'render_callback' => [ $this, 'pscb_review_block_render' ],
		] );

	}

	/**
	 * Render Callback
	 */
	public function pscb_review_block_render( $attributes, $content ) {
		$handle = $attributes['id'] ? $attributes['id'] : '';

		$blockStyles = isset( $attributes['blockStyles'] ) ? $attributes['blockStyles'] : '';

		$this->pscb_register_inline_style( $handle, $blockStyles );

		// return content
		return $content;
	}


	/**
	 * Register Block Category
	 */

	public function pscb_register_block_category( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'pscb-blocks',
					'title' => __( 'Product Blocks', 'product-showcase-blocks' ),
				),
			),
			$categories,
		);
	}

	/**
	 * Enqueue Block Assets
	 */
	public function pscb_external_libraries() {
		// enqueue JS
		if( ! is_admin() && has_block( 'pscb/review' ) ) {
			wp_enqueue_script( 'pscb-plugin-js', PSCB_INC_URL . 'js/plugin.js', array('jquery'), PSCB_VERSION, true );
		}
	}

}

/**
 * Kickoff
*/

PSCB_BLOCKS_CLASS::init();
