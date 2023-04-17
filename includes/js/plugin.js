(function ($) {
	$(document).ready(function () {
		const prbReview = $('.wp-block-pscb-review');
		// add show more button to review
		prbReview.each(function () {
			const review = $(this);
			const itemsOnLoad = parseInt(review.data('items'));
			const reviewItems = review.find('.wp-block-pscb-product');

			// hide all review items except first itemsOnLoad
			reviewItems.each(function (index) {
				if (index > itemsOnLoad - 1) {
					$(this).hide();
				}
			});

			// append show more button
			review.append(
				'<div class="prb-show-more"><button class="prb-toggle-btn">Show More +</button></div>'
			);

			// toggleSlide the rest review items on click and change button text
			review.find('.prb-toggle-btn').on('click', function () {
				reviewItems.each(function (index) {
					if (index > itemsOnLoad - 1) {
						$(this).slideToggle();
					}
				});
				$(this).text(function (i, text) {
					return text === 'Show More +'
						? 'Show Less -'
						: 'Show More +';
				});
			});
		});
	});
})(jQuery);
