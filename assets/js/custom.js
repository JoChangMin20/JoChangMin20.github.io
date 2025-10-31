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
