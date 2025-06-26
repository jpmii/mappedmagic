<?php

namespace App\Csp;

use Spatie\Csp\Policy;
use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Preset;
use Illuminate\Support\Facades\Log;


class CustomPreset implements Preset
{
    public function configure(Policy $policy): void
    {
        $policy->add(Directive::DEFAULT, Keyword::SELF)
            ->add(Directive::CONNECT, [Keyword::SELF, 'https://dpblu.com'])
            ->add(Directive::SCRIPT, [Keyword::SELF, 'https://dpblu.com'])
            ->add(Directive::IMG, [Keyword::SELF, 'https://dpblu.com'])
            ->add(Directive::STYLE, [Keyword::SELF])
            ->add(Directive::FRAME_ANCESTORS, [Keyword::SELF])
            ->add(Directive::FRAME, [Keyword::SELF]);

    }
}
