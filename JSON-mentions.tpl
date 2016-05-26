{strip}
{
  "reccount":{count($results)},
  "results":[
    {foreach $results as $r name=mainloop}
      {
        "recId":{$r.recID}{*ID *},
        "recTypeId" : {$r.recTypeID},
        "recTypeName":"{$r.recTypeName}{*RecTypeName*}",
        "recTitle":"{$r.recTitle|escape|escape:'htmlall'|replace:'"':'&quot;'|strip}{*RecTitle*}",

        {if ($r.f2)}  "shortName":"{$r.f2|escape|escape:'htmlall'|replace:'"':'&quot;'|strip}{*Short Name / Acronym*}",{/if}
        {if ($r.f10)} "startDate":{$r.f10|regex_replace:'/(.*)([0-9][0-9][0-9][0-9])(.*)$/':'$2'}{*Start Date/time*},{/if}
        {if ($r.f11)} "endDate":{$r.f11|regex_replace:'/(.*)([0-9][0-9][0-9][0-9])(.*)$/':'$2'}{*End Date*},{/if}

        {* Relationship *}
        {* --------------------------------------------------*}
        {if ($r.recTypeID=="1")}

          "relTypeId": {$r.f6.internalid} {*Relationship Type >> Internal ID*},
          "relTypeName": "{$r.f6.term}"{*Relationship Type >> Term*},
          "relDescription": "{$r.f3|escape|escape:'htmlall'|replace:'"':'&quot;'|strip}{*RecTitle*}"{*Relationship Type >> Term*},

          {if ($r.f7)} "source": {$r.f7.recID}{*Source Record >> ID*},{/if}
          {if ($r.f5)} "target": {$r.f5.recID}{*Target Record >> ID*},{/if}

        {/if}

        {* catch all *}
        {* --------------------------------------------------*}
        "end":true
      }
      {if !$smarty.foreach.mainloop.last},{/if}
    {/foreach}
  ]
}
{/strip}
