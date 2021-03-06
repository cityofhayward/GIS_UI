define(["dojo/ready", "app/gps"],
function(ready, gps ) {
  ready(function(){
    // This function won't run until the DOM has loaded and other modules that register
    // have run.
	var GPS = new gps();
navEvent = function(task) {
    "use strict";
    switch (task) {
    case 'defaultIdentify':
        operationToDo = 'identify';
        map.setMapCursor("default");
        iTool.activate(iTool._geometryType='point');
        map.enablePan();
        $('.clickInstructions').hide();
        $('.radioset').find(':radio').prop("checked", false);
        $('.radioset').buttonset('refresh');
        $('.results.identify').hide();
        $("#multipleSelectSelectBoxItContainer").hide();
        geometryBuffer = [];
        break;
    case 'point':
        operationToDo = 'selection';
        iTool.activate(iTool._geometryType='point');
        $('.clickInstructions').hide();
        $("#multipleSelectSelectBoxItContainer").hide();
        break;
    case 'line':
        operationToDo = 'selection';
        iTool.activate(iTool._geometryType='polyline');
        $('.clickInstructions').show();
        $("#multipleSelectSelectBoxItContainer").hide();
        break;
    case 'polygon':
        operationToDo = 'selection';
        iTool.activate(iTool._geometryType='polygon');
        $('.clickInstructions').show();
        $("#multipleSelectSelectBoxItContainer").hide();
        break;
    case 'clear':
        map.graphics.clear();
        tempGraphicLayer.clear();
        // look for variables holding values in memory like mesureGeometry
        measureGeometry = null;
        operationToDo = 'identify';
        iTool.activate(iTool._geometryType='point');
        geometryBuffer = [];
        selectedFeatures = { features: [] };
        unselectedGeometry = { features: [] };
        attrAll = [];
        attValues = [];
        csvInfo = [];
        mailParcels = [];
        // $('#search-tab a').removeClass('notice');
        $('.clickInstructions').hide();
        $('#menu-toggle').removeClass('tab');
        $('.results.identify').hide();
        $('.results.multipleBuffer').hide();
        $('.results.multiple').hide();
        //$('#searchfooter, #toolsfooter').css({'position': 'absolute', 'bottom': '7%'});
        $('#drawPoint').prop("checked",true);
        $('.radioset').buttonset('refresh');
        $('#noselected').show();
        map.enablePan();
        break;
    case 'tools clear':
        map.graphics.clear();
        tempGraphicLayer.clear();
         // look for variables holding values in memory like mesureGeometry
        measureGeometry = null;
        operationToDo = 'identify';
        iTool.activate(iTool._geometryType='point');
        geometryBuffer = [];
        selectedFeatures = { features: [] };
        unselectedGeometry = { features: [] };
        attrAll = [];
        attValues = [];
        csvInfo = [];
        mailParcels = [];
        // $('#search-tab a').removeClass('notice');
        $('.clickInstructions').hide();
        $('#menu-toggle').removeClass('tab');
        $('.results.identify').hide();
        $('.results.multipleBuffer').hide();
        $('.results.multiple').hide();
        $('#mailLabelBox').hide();
        $('.radioset').buttonset('refresh');
        $('.dDot,.drawLine,.Extent').removeClass('ui-state-active');
        $('#noselected').show();

        firstPoint=null;
        tbActive = false;
        $('#dynamicDistance').html('0 feet');
        $('#infoWindow').css('visibility','hidden');
        
        map.enablePan();
        break;
    case 'clearDrawing':
        graphicLayer.clear();
        graphicLayerLabels.clear();
        operationToDo = 'identify';
        iTool.activate(iTool._geometryType='point');
        $('.clickInstructions').hide();
        $('.radioset').find(':radio').prop("checked", false);
        $('.radioset').buttonset('refresh');
        $('#noselected').show();
        map.enablePan();
        // $('#search-tab a').removeClass('notice');
        $('#menu-toggle').removeClass('tab');
        break;
    case "resetMap":
        map.graphics.clear();
        graphicLayer.clear();
        tempGraphicLayer.clear();
        graphicLayerLabels.clear();
        var inputs = dojo.query(".utilityLayer,.aerial,.parentLayer,.overlayLayer,.groupLayer");
        var i;
        var il;
        var layerCheckState;
        for (i = 0, il = inputs.length; i < il; i++) {
            layerCheckState = $(inputs[i]).find("input:first");
            layerCheckState.prop("checked",false);
            layerCheckState.prev().prev().removeClass("checked");
            //console.log(layerCheckState);
        };
        // $('#search-tab a').removeClass('notice');
        $('#menu-toggle').removeClass('tab');
        overlayLayer.setVisibleLayers([-1]); //Resets tab content but does not reset the checkboxes
        utilityMap.setVisibleLayers([-1]);
        aerialLayer.hide();
        basemap.show();
        operationToDo = 'identify';
        iTool.activate(iTool._geometryType='point');
        geometryBuffer = [];
        selectedFeatures = { features: [] };
        unselectedGeometry = { features: [] };
        attrAll = [];
        attValues = [];
        csvInfo = [];
        mailParcels = [];
        $('.clickInstructions').hide();
        $('.radioset').find(':radio').prop("checked", false);
        $('.radioset').buttonset('refresh');
        $('.results.identify').hide();
        $('.results.multiple').hide();
        $('.results.multipleBuffer').hide();
        $('#toggleThis').removeClass('vectorToggle').addClass('aerialToggle').attr('src','images/Aerial.png');
        $('#noselected').show();
        map.enablePan();
        map.setExtent(initExtent);
        break;
    case "gps":
        if (navigator.geolocation) {
        //if you want to track as the user moves setup navigator.geolocation.watchPostion
        $("#loading").show();
		console.log(GPS);
        navigator.geolocation.getCurrentPosition(GPS.zoomToLocation, GPS._locationError);
        }
        break;
    case "measureLine":
        operationToDo = 'measure';
        measureGeometry = null;
        $('.clickInstructions').show();
        iTool.activate(iTool._geometryType='polyline');
        break;
    case "measurePolygon":
        operationToDo = 'measure';
        measureGeometry = null;
        $('.clickInstructions').show();
        iTool.activate(iTool._geometryType='polygon');
        break;
    case "drawingPolygon":
        operationToDo = 'drawing';
        labelling = false;
        //map.disablePan();
        $('.clickInstructions').show();
        iTool.activate(iTool._geometryType='polygon');
        break;
    case "drawingLine":
        operationToDo = 'drawing';
        labelling = false;
        //map.disablePan();
        $('.clickInstructions').show();
        iTool.activate(iTool._geometryType='polyline');
        break;
    case "drawingPoint":
        operationToDo = 'drawing';
        labelling = false;
        $('.clickInstructions').hide();
        iTool.activate(iTool._geometryType='point');
        break;
    case "drawingText":
        operationToDo = 'drawing';
        labelling = true;
        $('.clickInstructions').hide();
        iTool.activate(iTool._geometryType='point');
        break;

    }
}

  });  
});