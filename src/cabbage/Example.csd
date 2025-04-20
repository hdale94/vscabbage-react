
<Cabbage>[
{"type":"form","caption":"Effect","size":{"width":580,"height":500},"pluginId":"plug"},
{"type":"verticalSlider","channel":"gainL1","bounds":{"left":20,"top":100,"width":80,"height":180}, "text":"Gain", "range":{"min":0,"max":1,"defaultValue":0,"skew":1,"increment":0.02}},
{"type":"verticalSlider","channel":"gainR1","bounds":{"left":100,"top":100,"width":80,"height":180}, "text":"Gain", "range":{"min":0,"max":1,"defaultValue":0.25,"skew":1,"increment":0.02}},
{"type":"verticalSlider","channel":"gainL2","bounds":{"left":180,"top":100,"width":80,"height":180}, "text":"Gain", "range":{"min":0,"max":1,"defaultValue":0.5,"skew":1,"increment":0.02}},
{"type":"verticalSlider","channel":"gainR2","bounds":{"left":260,"top":100,"width":80,"height":180}, "text":"Gain", "range":{"min":0,"max":1,"defaultValue":0.75,"skew":1,"increment":0.02}}
]</Cabbage>
<CsoundSynthesizer>
<CsOptions>
-n -d
</CsOptions>
<CsInstruments>
; Initialize the global variables. 
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1
    a1 inch 1
	a2 inch 2
	
    kGainL1 cabbageGetValue "gainL1"
    kGainR1 cabbageGetValue "gainR1"
    kGainL2 cabbageGetValue "gainL2"
    kGainR2 cabbageGetValue "gainR2"

    outs a1*kGainL1*kGainL2, a2*kGainR1*kGainR2
endin

</CsInstruments>
<CsScore>
;causes Csound to run for about 7000 years...
i1 0 z
</CsScore>
</CsoundSynthesizer>