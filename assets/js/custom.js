$(function () {
    var $form   = $('#contact-form');
    if (!$form.length) return;

    var $local  = $('#email-local');
    var $domain = $('#email-domain');
    var $custom = $('#email-domain-custom');
    var $wrap   = $('#email-inline');
    var $full   = $('#email-full');

    function currentDomain() {
        return ($domain.val() === 'custom') ? ($custom.val() || '').trim().replace(/^@/, '') : $domain.val();
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

    $form.on('submit', function (e) {
        syncEmail();
        var ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($full.val());
        if (!ok) { e.preventDefault(); alert('이메일 형식을 확인해 주세요.'); }
    });
});
