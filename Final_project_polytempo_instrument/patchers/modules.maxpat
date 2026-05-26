{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 9,
			"minor" : 0,
			"revision" : 7,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 161.0, 116.0, 1852.0, 929.0 ],
		"gridsize" : [ 15.0, 15.0 ],
		"boxes" : [ 			{
				"box" : 				{
					"hidden" : 1,
					"id" : "obj-37",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 479.0, -1.0, 79.0, 22.0 ],
					"text" : "r startPlaying",
					"varname" : "rStartPLAYING"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.631372549019608, 0.094117647058824, 0.094117647058824, 1.0 ],
					"fontname" : "Arial Bold",
					"fontsize" : 20.0,
					"id" : "obj-137",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 459.0, -3.0, 140.0, 26.0 ],
					"text" : "Start Playing",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"texton" : "",
					"varname" : "startPlaying"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.592156862745098, 0.196078431372549, 0.196078431372549, 1.0 ],
					"hidden" : 1,
					"id" : "obj-213",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 496.0, 595.121965408325195, 106.0, 22.0 ],
					"text" : "r BangToCompare",
					"varname" : "recieveBangToCompare"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.72156862745098, 0.172549019607843, 0.172549019607843, 1.0 ],
					"fontface" : 0,
					"fontname" : "Arial Bold",
					"fontsize" : 20.0,
					"id" : "obj-8",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 959.756120443344116, 587.804892063140869, 159.0, 49.0 ],
					"text" : "Clear the graph",
					"textoncolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "clearTheGraphButton"
				}

			}
, 			{
				"box" : 				{
					"filename" : "graphCommonAllModules.js",
					"id" : "obj-351",
					"maxclass" : "jsui",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 496.0, 676.829284429550171, 1005.0, 521.0 ],
					"varname" : "graphAllModules"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"linecount" : 10,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 49.0, 1401.0, 144.0, 144.0 ],
					"text" : "INPUTS:\n1. read MIDI\n2. start playing\n3. override tempo toggle\n4. new tempo \nOUTPUTS:\n1. Bars\n2. Beats\n3. Tempo \n4. Original Seq Tempo",
					"varname" : "comments"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.776470588235294, 0.235294117647059, 0.235294117647059, 1.0 ],
					"hidden" : 1,
					"id" : "obj-59",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 496.0, 636.585381031036377, 24.0, 24.0 ],
					"varname" : "bangToCountNewTempo"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.776470588235294, 0.235294117647059, 0.235294117647059, 1.0 ],
					"id" : "obj-56",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 265.0, 529.26830530166626, 145.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "newTempoAlgorythm.js",
						"parameter_enable" : 0
					}
,
					"text" : "js newTempoAlgorythm.js",
					"varname" : "newTempoAlgorythmObject"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.572549019607843, 0.266666666666667, 0.266666666666667, 1.0 ],
					"hidden" : 1,
					"id" : "obj-428",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 539.0, 361.0, 24.0, 24.0 ],
					"varname" : "startTimeBang"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.572549019607843, 0.266666666666667, 0.266666666666667, 1.0 ],
					"hidden" : 1,
					"id" : "obj-429",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 539.0, 318.0, 95.0, 22.0 ],
					"text" : "r zeroValueTime",
					"varname" : "toSave[2]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.572549019607843, 0.266666666666667, 0.266666666666667, 1.0 ],
					"hidden" : 1,
					"id" : "obj-23",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 479.0, 72.0, 97.0, 22.0 ],
					"text" : "s zeroValueTime",
					"varname" : "toSave[1]"
				}

			}
, 			{
				"box" : 				{
					"hidden" : 1,
					"id" : "obj-33",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 567.0, 0.0, 194.0, 20.0 ],
					"text" : "start playing + transport activation",
					"varname" : "toSave"
				}

			}
, 			{
				"box" : 				{
					"hidden" : 1,
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 296.34147047996521, 573.170745372772217, 97.0, 22.0 ],
					"text" : "r modules_script",
					"varname" : "rModulesScript"
				}

			}
, 			{
				"box" : 				{
					"hidden" : 1,
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 296.34147047996521, 620.731722116470337, 67.0, 22.0 ],
					"save" : [ "#N", "thispatcher", ";", "#Q", "end", ";" ],
					"text" : "thispatcher",
					"varname" : "thispatcher[0]"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"source" : [ "obj-137", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 0 ],
					"source" : [ "obj-213", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-428", 0 ],
					"source" : [ "obj-429", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-351", 0 ],
					"order" : 0,
					"source" : [ "obj-59", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"midpoints" : [ 505.5, 669.219513416290283, 274.5, 669.219513416290283 ],
					"order" : 1,
					"source" : [ "obj-59", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-351", 1 ],
					"midpoints" : [ 969.256120443344116, 664.97561240196228, 1491.5, 664.97561240196228 ],
					"source" : [ "obj-8", 0 ]
				}

			}
 ]
	}

}
