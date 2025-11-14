// ==================== Contact Email Combiner ====================
$(function () {
    var $form   = $('#contact-form');
    if (!$form.length) return;

    var $local  = $('#email-local');
    var $domain = $('#email-domain');
    var $custom = $('#email-domain-custom');
    var $wrap   = $('#email-inline');
    var $full   = $('#email-full');

    function currentDomain() {
        return ($domain.val() === 'custom')
            ? ($custom.val() || '').trim().replace(/^@/, '')
            : $domain.val();
    }

    function syncEmail() {
        var l = ($local.val() || '').trim();
        var d = currentDomain();
        $full.val(l && d ? (l + '@' + d) : '');
    }

    function toggleCustom() {
        if ($domain.val() === 'custom') {
            $wrap.addClass('show-custom');
            $custom.attr('required', true);
        } else {
            $wrap.removeClass('show-custom');
            $custom.removeAttr('required').val('');
        }
        syncEmail();
    }

    toggleCustom();
    $domain.on('change', toggleCustom);
    $local.on('input', syncEmail);
    $custom.on('input', syncEmail);

    // 중복 방지 & 정상 전송
    $form.off('submit').on('submit', function (e) {
        e.preventDefault();
        syncEmail();

        var email = $full.val();
        console.log("final email before send:", email);

        if (!email || email.indexOf('@') === -1) {
            alert('이메일 아이디와 도메인을 확인해 주세요.');
            return false;
        }

        // 중복 방지 후 실제 전송
        $form.off('submit');
        $form.get(0).submit();
    });
});

// ==================== Portfolio Image Modal ====================
$(function () {
    var $modal    = $('#img-modal');
    var $modalImg = $('#img-modal-full');
    var $close    = $('.img-modal-close');

    if (!$modal.length) return; // 모달 마크업 없으면 아무것도 안 함

    $('.js-modal-thumb').on('click', function (e) {
        e.preventDefault();

        var $img = $(this).find('img');
        // 지금은 썸네일 자체가 전체 스크롤캡쳐라 src 그대로 써도 됨
        $modalImg.attr('src', $img.attr('src'));

        $modal.addClass('is-open');
    });

    $close.on('click', function () {
        $modal.removeClass('is-open');
    });

    $modal.on('click', function (e) {
        if (e.target === this) {
            $modal.removeClass('is-open');
        }
    });
});

// Portfolio Image Modal
$(function () {
    var $modal    = $('#img-modal');
    var $modalImg = $('#img-modal-full');
    var $close    = $('.img-modal-close');

    if (!$modal.length) return;

    $('.js-modal-thumb').on('click', function (e) {
        e.preventDefault();

        var $img = $(this).find('img');
        $modalImg
            .attr('src', $img.attr('src'))
            .removeClass('zoomed');   // 항상 기본 상태로 시작

        $modal.addClass('is-open');
    });

    $close.on('click', function () {
        $modal.removeClass('is-open');
    });

    $modal.on('click', function (e) {
        if (e.target === this) {
            $modal.removeClass('is-open');
        }
    });

    // 이미지 클릭해서 확대/축소
    $modalImg.on('click', function (e) {
        e.stopPropagation(); // 모달 배경 클릭으로 닫히는 거랑 충돌 방지
        $(this).toggleClass('zoomed');
    });
});
