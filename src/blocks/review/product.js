import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	MediaUpload,
	useBlockProps,
	BlockControls,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Button,
	ToolbarGroup,
	ToolbarButton,
	Card,
	CardHeader,
	CardBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

// register product type block
registerBlockType('pscb/product', {
	title: __('Product', 'product-showcase-blocks'),
	icon: 'cart',
	category: 'prb-blocks',
	description: __('single product review', 'product-review-blocks'),
	supports: {
		html: false,
	},
	parent: ['pscb/review'],
	attributes: {
		image: {
			type: 'object',
		},
		subtitle: {
			type: 'string',
		},
		title: {
			type: 'string',
		},
		readMoreBtn: {
			type: 'object',
			default: {
				label: 'Read More',
				url: '#',
			},
		},
		cta: {
			type: 'object',
			default: {
				label: '$398 at Amazon',
				url: '#',
				newTab: false,
			},
		},
	},
	edit: ({ attributes, setAttributes, className }) => {
		const { image, subtitle, title, readMoreBtn, cta } = attributes;
		return (
			<Fragment>
				{image && (
					<BlockControls>
						<ToolbarGroup>
							<MediaUpload
								onSelect={(media) => {
									setAttributes({ image: media });
								}}
								type="image"
								value={image && image.id}
								render={({ open }) => (
									<ToolbarButton
										className="components-toolbar__control"
										label={__(
											'Edit Image',
											'product-review-blocks'
										)}
										onClick={open}
										icon="edit"
									/>
								)}
							/>
						</ToolbarGroup>
					</BlockControls>
				)}
				<InspectorControls>
					<Card>
						<CardHeader>
							<strong>
								{__('Read More Link', 'product-review-blocks')}
							</strong>
						</CardHeader>
						<CardBody>
							<TextControl
								label={__('Link', 'product-review-blocks')}
								value={readMoreBtn.url && readMoreBtn.url}
								onChange={(value) =>
									setAttributes({
										readMoreBtn: {
											...readMoreBtn,
											url: value,
										},
									})
								}
								placeholder={__(
									'link..',
									'product-review-blocks'
								)}
							/>
						</CardBody>
					</Card>
					<Card>
						<CardHeader>
							<strong>
								{__('CTA Button', 'product-review-blocks')}
							</strong>
						</CardHeader>
						<CardBody>
							<TextControl
								label={__(
									'Button Link',
									'product-review-blocks'
								)}
								value={cta.url && cta.url}
								onChange={(value) =>
									setAttributes({
										cta: {
											...cta,
											url: value,
										},
									})
								}
								placeholder={__(
									'button link..',
									'product-review-blocks'
								)}
							/>
							<ToggleControl
								label={__(
									'Open in new tab',
									'product-review-blocks'
								)}
								checked={cta.newTab}
								onChange={() =>
									setAttributes({
										cta: {
											...cta,
											newTab: !cta.newTab,
										},
									})
								}
							/>
						</CardBody>
					</Card>
				</InspectorControls>
				<div className={className}>
					<div className="prb-image">
						{image ? (
							<img
								src={image.url}
								alt={image.alt || 'product image'}
							/>
						) : (
							<MediaUpload
								onSelect={(media) => {
									setAttributes({ image: media });
								}}
								type="image"
								value={image && image.id}
								render={({ open }) => (
									<Button
										className="prb-image__placeholder"
										onClick={open}
										icon="format-image"
										variant="secondary"
									>
										<span>
											{__(
												'Add Image',
												'product-review-blocks'
											)}
										</span>
									</Button>
								)}
							/>
						)}
					</div>
					<div className="prb-content">
						<RichText
							tagName="h4"
							className={'prb-subtitle'}
							value={subtitle}
							onChange={(value) =>
								setAttributes({ subtitle: value })
							}
							placeholder={__(
								'subtitle..',
								'product-review-blocks'
							)}
							allowedFormats={['core/bold', 'core/italic']}
						/>
						<RichText
							tagName="h2"
							className={'prb-title'}
							value={title}
							onChange={(value) =>
								setAttributes({ title: value })
							}
							placeholder={__('title..', 'product-review-blocks')}
							allowedFormats={['core/bold', 'core/italic']}
						/>
						<p className="prb-btn">
							<RichText
								tagName="span"
								className={'prb-cta__read-more'}
								value={readMoreBtn.label && readMoreBtn.label}
								onChange={(value) =>
									setAttributes({
										readMoreBtn: {
											...readMoreBtn,
											label: value,
										},
									})
								}
								placeholder={__(
									'Read More..',
									'product-review-blocks'
								)}
								allowedFormats={[]}
							/>
						</p>
					</div>
					<div className="prb-cta-wrapper">
						<p className="prb-cta">
							<RichText
								tagName="span"
								className={'prb-cta__btn'}
								value={cta.label && cta.label}
								onChange={(value) =>
									setAttributes({
										cta: {
											...cta,
											label: value,
										},
									})
								}
								placeholder={__(
									'Buy Now..',
									'product-review-blocks'
								)}
								allowedFormats={[]}
							/>
						</p>
					</div>
				</div>
			</Fragment>
		);
	},
	save: ({ attributes }) => {
		const { image, subtitle, title, readMoreBtn, cta } = attributes;
		return (
			<div {...useBlockProps.save()}>
				<div className="prb-image">
					{image && (
						<img
							src={image.url}
							alt={image.alt || 'product image'}
							className={`wp-image-${image.id}`}
						/>
					)}
				</div>
				<div className="prb-content">
					{subtitle && (
						<RichText.Content
							tagName="h4"
							className={'prb-subtitle'}
							value={subtitle}
						/>
					)}

					{title && (
						<RichText.Content
							tagName="h2"
							className={'prb-title'}
							value={title}
						/>
					)}
					{readMoreBtn && readMoreBtn.url && readMoreBtn.label && (
						<a className="prb-btn" href={readMoreBtn.url}>
							<RichText.Content
								className={'prb-cta__read-more'}
								value={readMoreBtn.label}
							/>
						</a>
					)}
				</div>
				<div className="prb-cta-wrapper">
					{cta && cta.url && cta.label && (
						<a
							className="prb-cta"
							href={cta.url}
							target={cta.newTab && '_blank'}
							rel={cta.newTab && 'noreferrer noopener'}
						>
							<RichText.Content
								className={'prb-cta__btn'}
								value={cta.label}
							/>
						</a>
					)}
				</div>
			</div>
		);
	},
});
