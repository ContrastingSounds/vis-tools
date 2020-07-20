!function(e){var s={};function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,s,t){i.o(e,s)||Object.defineProperty(e,s,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,s){if(1&s&&(e=i(e)),8&s)return e;if(4&s&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&s&&"string"!=typeof e)for(var a in e)i.d(t,a,function(s){return e[s]}.bind(null,a));return t},i.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(s,"a",s),s},i.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},i.p="",i(i.s=3)}([function(e,s){class i{constructor({vis:e,queryResponseField:s}){this.vis=e,this.name=s.name,this.view=s.view_label||"",this.label=s.field_group_variant||s.label_short||s.label,this.is_numeric=void 0!==s.is_numeric&&s.is_numeric,this.is_array=["list","number_list","location","tier"].includes(s.type),this.value_format=s.value_format?s.value_format:"",this.geo_type="",("location"===s.type||s.map_layer)&&(this.geo_type="location"===s.type?"location":s.map_layer.name),this.hide=!1,void 0!==this.vis.config["hide|"+this.name]&&this.vis.config["hide|"+this.name]&&(this.hide=!0),this.style="";var i=this.vis.config["style|"+this.name];void 0!==i&&("hide"===i?this.hide=!0:this.style=i),this.heading="",this.short_name="",this.unit="",void 0!==s.tags&&s.tags.forEach(e=>{var s=e.split(":");if("vis-tools"===s[0])switch(s[1]){case"heading":this.heading=s[2];break;case"short_name":this.short_name=s[2];break;case"unit":this.unit=s[2];break;case"style":this.style=s[2]}})}}class t{constructor({keys:e,values:s,types:i=[]}){if(e.length===s.length){this.keys=e,this.values=s,this.types=i;var t=[],a=[];this.values.forEach((e,s)=>{this.types[s]=void 0!==i[s]?i[s]:"line_item","line_item"===this.types[s]?(t.push(e),a.push(e)):"subtotal"===this.types[s]&&a.push(e)}),this.min_for_display=Math.min(...a),this.max_for_display=Math.max(...a),this.min=Math.min(...t),this.max=Math.max(...t),this.sum=t.reduce((e,s)=>e+s,0),this.count=t.length,this.avg=t.length>0?this.sum/t.length:null}else console.log("Could not construct series, arrays were of different length.")}}s.newArray=function(e,s){for(var i=[],t=0;t<e;t++)i.push(s);return i},s.ModelDimension=class extends i{constructor({vis:e,queryResponseField:s}){super({vis:e,queryResponseField:s}),this.type="dimension",this.align="left"}},s.ModelPivot=class extends i{constructor({vis:e,queryResponseField:s}){super({vis:e,queryResponseField:s}),this.type="pivot",this.align="center"}},s.ModelMeasure=class extends i{constructor({vis:e,queryResponseField:s,can_pivot:i}){super({vis:e,queryResponseField:s}),this.type="measure",this.align="right",this.is_table_calculation=void 0!==s.is_table_calculation&&s.is_table_calculation,this.calculation_type=s.type,this.is_turtle=void 0!==s.is_turtle&&s.is_turtle,this.can_pivot=i}},s.CellSeries=class{constructor({column:e,row:s,sort_value:i,series:a}){this.column=e,this.row=s,this.sort_value=i,this.series=new t(a)}toString(){var e="";return this.series.keys.forEach((s,i)=>{e+=s+":";var t=""===this.column.modelField.value_format?this.series.values[i].toString():SSF.format(this.column.modelField.value_format,this.series.values[i]);e+=t+" "}),e}},s.ColumnSeries=class{constructor({column:e,is_numeric:s,series:i}){this.column=e,this.is_numeric=s,this.series=new t(i)}},s.HeaderCell=class{constructor({vis:e,type:s,modelField:i={name:"",label:"",view:""},pivotData:t={}}={vis:e,type:s,modelField:i,pivotData:t}){this.vis=e,this.type=s,this.modelField=i,this.pivotData=t}},s.DataCell=class{constructor({value:e,rendered:s=null,html:i=null,links:t=[],cell_style:a=[],align:l="right",rowid:o="",colid:r="",rowspan:n=1}={}){this.value=e,this.rendered=s,this.html=i,this.links=t,this.cell_style=a,this.align=l,this.rowid=o,this.colid=r,this.rowspan=n}},s.Row=class{constructor(e="line_item"){this.id="",this.hide=!1,this.type=e,this.sort=[],this.data={}}},s.Column=class{constructor(e,s,i){this.id=e,this.vis=s,this.modelField=i,this.transposed=!1,this.idx=0,this.pos=0,this.levels=[],this.pivot_key="",this.unit=i.unit||"",this.hide=i.hide||!1,this.variance_type="",this.pivoted=!1,this.subtotal=!1,this.super=!1,this.series=null,this.sort_by_measure_values=[],this.sort_by_pivot_values=[],this.colspans=[];var t={};this.vis.headers.forEach(e=>{t[e.type]=1}),this.vis.colspan_values[this.id]=t}getLabel(e){var s=this.levels[e],i=s.modelField.label,t=this.vis.config["heading|"+s.modelField.name],a=this.vis.config["label|"+s.modelField.name];if("heading"===s.type)return i=void 0!==t&&t||s.modelField.heading;if("field"===s.type){if(void 0!==this.vis.visId&&"report_table"===this.vis.visId)switch(this.variance_type){case"absolute":i="Var #";break;case"percentage":i="Var %";break;default:i=this.vis.useShortName&&s.modelField.short_name||s.modelField.label}void 0!==a&&a!==this.modelField.label&&(i=a||i),void 0!==this.vis.useViewName&&this.vis.useViewName&&(i=[this.modelField.view,i].join(" "))}return i}getHeaderLevels(){if("getSortByPivots"===this.modelField.vis.sortColsBy)var e=[...this.levels,this.getLabel(this.levels.length)];else e=[this.getLabel(0),...this.levels];if(this.modelField.vis.useHeadings&&!this.modelField.vis.has_pivots){var s=this.modelField.heading,i=this.modelField.vis.config["heading|"+this.modelField.name];void 0!==i&&(s=i||s),e.unshift(s)}return e}getHeaderData(){var e={};return this.modelField.vis.headers.forEach((s,i)=>{e[s.type]=this.levels[i]}),e}updateSortByMeasures(e){1==this.sort_by_measure_values[0]&&(this.pivoted||this.subtotal||(this.sort_by_measure_values=[1,e]))}getSortByMeasures(){return this.sort_by_measure_values}getSortByPivots(){return this.sort_by_pivot_values}}},,,function(e,s,i){"use strict";i.r(s);var t=i(0);const a={dimensionLabels:!0,dimensionHide:!1,measureLabels:!0,measureStyles:[],colorBy:!1,groupBy:!1,sizeBy:!1};exports.VisPluginModel=class{constructor(e,s,i){this.visId="vis_plugin",this.config=s,this.dimensions=[],this.measures=[],this.columns=[],this.data=[],this.ranges={},this.pivot_fields=[],this.pivot_values=[],this.has_pivots=!1,void 0!==i.fields.supermeasure_like?this.has_supers=!0:this.has_supers=!1,this.addPivots(i),this.addDimensions(i),this.addMeasures(i),this.buildRows(e)}addPivots(e){void 0!==e.pivots&&(e.fields.pivots.forEach(e=>{var s=new t.PivotField({name:e.name,label:e.label_short||e.label,view:e.view_label||""});this.pivot_fields.push(s),this.ranges[s.name]={set:[]}}),this.pivot_values=e.pivots,this.ranges.lookerPivotKey={set:[]},this.pivot_values.forEach(e=>{for(var s in this.ranges.lookerPivotKey.set.push(e.key),e.data){var i=this.ranges[s].set,t=e.data[s];-1===i.indexOf(t)&&i.push(t)}}),this.has_pivots=!0)}addDimensions(e){e.fields.dimension_like.forEach(s=>{var i=new t.ModelDimension({vis:this,modelField:s});this.dimensions.push(i),this.ranges[i.name]={set:[]};var a=new t.Column(i.name,this,i);a.levels=Object(t.newArray)(e.fields.pivots.length,""),this.columns.push(a)})}addMeasures(e){e.fields.measure_like.forEach(e=>{var s=new t.ModelMeasure({vis:this,modelField:e});this.measures.push(s),this.ranges[s.name]={min:1e8,max:0}}),this.has_pivots?this.pivot_values.forEach(e=>{this.measures.length.forEach((s,i)=>{if("$$$_row_total_$$$"!=e.key||"$$$_row_total_$$$"==e.key&&0==s.is_table_calculation){var a=e.key,l=a+"."+s.name,o=[],r=[];this.pivot_fields.forEach(s=>{o.push(e[s.name]),r.push(e.sort_values[s.name])});var n=new t.Column(l,this,s);n.levels=o,n.pivoted=!0,n.pivot_key=a,this.columns.push(n)}})}):this.measures.forEach(e=>{var s=new t.Column(e.name,vis,e);this.columns.push(s),void 0!==this.config["style|"+s.id]&&"hide"===this.config["style|"+s.id]&&(s.hide=!0)}),void 0!==e.fields.supermeasure_like&&e.fields.supermeasure_like.forEach(s=>{var i=new t.ModelMeasure({vis:this,modelField:s});this.measures.push(i);var a=new t.Column(i.name,this,i);a.levels=Object(t.newArray)(e.fields.pivots.length,""),a.super=!0,this.columns.push(a)})}buildRows(e){e.forEach(e=>{var s=new t.Row;this.columns.forEach(i=>{var t=i.modelField.name;if(i.pivoted?s.data[i.id]=e[t][i.pivot_key]:s.data[i.id]=e[i.id],void 0!==s.data[i.id]){if("measure"===i.modelField.type){var a=this.ranges[t].min,l=this.ranges[t].max,o=s.data[i.id].value;this.ranges[t].min=Math.min(a,o),this.ranges[t].max=Math.max(l,o)}else if("dimension"===i.modelField.type){var r=this.ranges[t].set;o=s.data[i.id].value;-1===r.indexOf(o)&&r.push(o)}void 0===s.data[i.id].cell_style&&(s.data[i.id].cell_style=[])}});var i=[];this.dimensions.forEach(s=>{i.push(e[s.name].value)}),s.id=i.join("|"),this.data.push(s)})}getDimensionByName(e){this.dimensions.forEach(s=>{if(s.name===e)return s})}getMeasureByName(e){this.measures.forEach(s=>{if(s.name===e)return s})}getJson(e=!0,s=!1){var i=[];return this.has_pivots&&s?this.pivot_values.forEach(s=>{this.data.forEach(t=>{var a={};for(var l in s.data)a[l]=s.data[l];this.columns.filter(e=>!e.hide).filter(e=>"dimension"===e.type||e.super).forEach(e=>{a[e.id]=t.data[e.id].value}),this.columns.filter(e=>!e.hide).filter(e=>e.pivoted).forEach(e=>{var i=s.key+"."+e.modelField.name;a[e.modelField.name]=t.data[i].value}),e&&(a.lookerId=s.key+"|"+t.id),a.lookerPivotKey=s.key,i.push(a)})}):this.data.forEach(s=>{var t={};this.columns.filter(e=>!e.hide).forEach(e=>{t[e.id]=s.data[e.id].value}),e&&(t.lookerId=s.id),i.push(t)}),i}getTooltipFromD3(e){var s="";return Object.entries(e).forEach(e=>{s+="<p><em>"+e[0]+":</em> "+e[1]+"</p>"}),s}},exports.getConfigOptions=(e,s=a,i={})=>{s={...a,...s};var t=i;if(e.dimensions.forEach((e,i)=>{s.dimensionLabels&&(t["label|"+e.name]={section:"Dimensions",type:"string",label:e.label,default:e.label,order:10*i+1}),s.dimensionHide&&(t["hide|"+e.name]={section:"Dimensions",type:"boolean",label:"Hide",display_size:"third",order:10*i+2})}),e.measures.forEach((i,a)=>{s.measureLabels&&(t["label|"+i.name]={section:"Measures",type:"string",label:i.label_short||i.label,default:i.label_short||i.label,order:100+10*a+1}),s.measureStyles.length>0&&(t["style|"+e.measures[a].name]={section:"Measures",type:"string",label:"Style",display:"select",values:optionChoices.measureStyles,order:100+10*a+2})}),s.sizeBy){var l=[];e.measures.forEach(e=>{var s={};s[e.label]=e.name,l.push(s)}),t.sizeBy={section:" Visualization",type:"string",label:"Size By",display:"select",values:l,default:"0",order:300}}var o=[];return e.dimensions.forEach(e=>{var s={};s[e.label]=e.name,o.push(s)}),e.pivot_fields.forEach(e=>{var s={};s[e.label]=e.name,o.push(s)}),e.pivot_fields.length>1&&o.push({"Pivot Series":"lookerPivotKey"}),s.colorBy&&(t.colorBy={section:" Visualization",type:"string",label:"Color By",display:"select",values:o,default:"0",order:100}),s.groupBy&&(t.groupBy={section:" Visualization",type:"string",label:"Group By",display:"select",values:o,default:"0",order:200}),t}}]);
//# sourceMappingURL=vis_plugin.js.map