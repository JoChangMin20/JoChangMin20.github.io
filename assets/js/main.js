/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(min-width: 961px) and (max-width: 1880px)',
		normal: '(min-width: 961px) and (max-width: 1620px)',
		narrow: '(min-width: 961px) and (max-width: 1320px)',
		narrower: '(max-width: 960px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly();

		// Nav.
			var $nav_a = $('#nav a.scrolly');

			// Scrolly-fy links.
				if($nav_a.scrolly()){
					$nav_a
						.scrolly()
						.on('click', function(e) {

							var t = $(this),
								href = t.attr('href');

							if (href[0] != '#')
								return;

							e.preventDefault();

							// Clear active and lock scrollzer until scrolling has stopped
								$nav_a
									.removeClass('active')
									.addClass('scrollzer-locked');

							// Set this link to active
								t.addClass('active');

						});
				}

			// Initialize scrollzer.
				var ids = [];

				$nav_a.each(function() {

					var href = $(this).attr('href');

					if (href[0] != '#')
						return;

					ids.push(href.substring(1));

				});

				$.scrollzer(ids, { pad: 200, lastHack: true });

		// Header (narrower + mobile).

			// Toggle.
				$(
					'<div id="headerToggle">' +
						'<a href="#header" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Header.
				$('#header')
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'header-visible'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#headerToggle, #header, #main')
						.css('transition', 'none');

	});

})(jQuery);

// Contact email combiner
$(function () {
    var $form       = $('#contact-form');
    if (!$form.length) return; // 다른 페이지에선 실행 안 함

    var $local      = $('#email-local');
    var $domain     = $('#email-domain');
    var $customWrap = $('#custom-domain-wrap');
    var $custom     = $('#email-domain-custom');
    var $full       = $('#email-full');

    function getDomainValue() {
        return ($domain.val() === 'custom') ? ($custom.val() || '').trim() : $domain.val();
    }

    function syncEmail() {
        var local  = ($local.val() || '').trim();
        var domain = getDomainValue();
        $full.val(local && domain ? (local + domain) : '');
    }

    $domain.on('change', function () {
        if ($domain.val() === 'custom') {
            $customWrap.slideDown(120);
        } else {
            $customWrap.slideUp(120);
            $custom.val('');
        }
        syncEmail();
    });

    $local.on('input', syncEmail);
    $custom.on('input', syncEmail);

    $form.on('submit', function (e) {
        syncEmail();
        if (!$full.val() || $full.val().indexOf('@') <= 0) {
            e.preventDefault();
            alert('이메일 아이디와 도메인을 확인해 주세요.');
        }
    });
});

// === Contact email combiner (jQuery) ======================
$(function () {
    var $form       = $('#contact-form');
    if (!$form.length) return; // 다른 페이지에선 실행 안 함

    var $local      = $('#email-local');
    var $domain     = $('#email-domain');
    var $customWrap = $('#custom-domain-wrap');
    var $custom     = $('#email-domain-custom');
    var $full       = $('#email-full');

    function getDomainValue() {
        return ($domain.val() === 'custom') ? ($custom.val() || '').trim() : $domain.val();
    }

    function syncEmail() {
        var local  = ($local.val() || '').trim();
        var domain = getDomainValue();
        $full.val(local && domain ? (local + domain) : '');
    }

    // 기본 상태: custom 선택 + 커스텀 입력 보여주기
    $domain.val('custom');
    $customWrap.show();
    syncEmail();

    $domain.on('change', function () {
        if ($domain.val() === 'custom') {
            $customWrap.slideDown(120);
        } else {
            $customWrap.slideUp(120);
            $custom.val('');
        }
        syncEmail();
    });

    $local.on('input', syncEmail);
    $custom.on('input', syncEmail);

    $form.on('submit', function (e) {
        syncEmail();
        if (!$full.val() || $full.val().indexOf('@') <= 0) {
            e.preventDefault();
            alert('Please check your email ID and domain.');
        }
    });
});
