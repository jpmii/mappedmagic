<?php
namespace App\Csp;

use Spatie\Csp\Policy;
use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Preset;

class CustomPreset implements Preset
{
    public function configure(Policy $policy): void
    {
        $policy->add(Directive::DEFAULT, Keyword::SELF);
        $policy->add(Directive::CONNECT, [Keyword::SELF, 'https://dpblu.com']);
        $policy->add(Directive::SCRIPT, [Keyword::SELF, 'https://dpblu.com']);
        $policy->add(Directive::IMG, [Keyword::SELF, 'https://dpblu.com']);
        $policy->add(Directive::STYLE, Keyword::SELF);
        $policy->add(Directive::FRAME_ANCESTORS, Keyword::SELF);
        $policy->add(Directive::FRAME, Keyword::SELF);


        //Header set Content-Security-Policy "default-src 'self'; connect-src https://matomo.example.com; script-src 'self' https://matomo.example.com; img-src 'self' https://matomo.example.com; style-src 'self'; frame-ancestors 'self'; frame-src 'self';"
    }
}