/* ----------------- On startup ----------------- */
$(function() {

	// Buttons
	$("#add_textarea").click(function() {
		event.preventDefault();
		addStuff("text");
	});

	$("#uploadSubmit").click(function() {
		addStuff("image");
	});

	$("#add_list").click(function() {
		event.preventDefault();
		addStuff("list");
	});

	$("#add_youtube").click(function() {
		event.preventDefault();
		addStuff("youtube");
	});

	$("#article_title").keyup(function() {
		event.preventDefault();
		var titleVar = $("#article_title").val();
		$("#article_title_set").text(titleVar);
	});

})


/* ---------------- Extra Variables ------------------ */
var idCount = 1;


/* ---------------- Image upload request ------------- */
function submitForm() {
        console.log("submit event");
        var fd = new FormData(document.getElementById("fileinfo"));
        fd.append("label", "WebUpload_");
        $.ajax({
          url: "upload.php",
          type: "POST",
          data: fd,
          processData: false,  // tell jQuery not to process the data
          contentType: false   // tell jQuery not to set contentType
        }).done(function( data ) {
            console.log("PHP Output:");
            console.log( data );
        });
    return false;
}


/* ------------------ addstuff function ------------------ */
function addStuff(types) {
	// Variables
	var types, blockHolder, spanBoxNr, inputBox, removeBtn, resultHolder;
	blockHolder = $("#block_holder");
	resultHolder = $("#result_holder");
	spanBoxNr = "<span>Nr: </span>";
	inputBox = "<input type=\"number\" class=\"boxId\" min=\"1\" value=\"" + idCount + "\">";
	removeBtn = "<input type=\"button\" class=\"removeBtn\" value=\"Delete block\">";

	// Text setup
	if (types === "text") {
		//Adding block
		var spanBoxSort, textBox, totalText, resultTextBox;

		spanBoxSort = "<span> - Paragraph - </span>";
		textBox = "<textarea id=\"textNr" + idCount + "\" class=\"textbox\"></textarea>";
		totalText = "<div id=\"boxNr" + idCount + "\" class=\"textboxes GREEN\" style=\"order:" + idCount + "\">" + spanBoxNr + inputBox + spanBoxSort + removeBtn + textBox + "</div>";
		
		blockHolder.append(totalText);

		//Add to result
		resultTextBox = "<p class=\"finnishedTextbox\" id=\"resultNr" + idCount + "\" style=\"order:" + idCount + "\"></p>";
		resultHolder.append(resultTextBox);
	}

	// Image setup
	else if (types === "image") {
		//Adding block
		var spanBoxSort2, imageBox, totalImage, imgSrc, resultImageBox;
			
		imgSrc = document.getElementById('fileToUpload').files[0];
		spanBoxSort2 = "<span> - Image: " + imgSrc.name + " - </span>";
		imageBox = "<img src=\"uploads/WebUpload_" + imgSrc.name + "\" class=\"imageBox\">";
		totalImage = "<div id=\"boxNr" + idCount + "\" class=\"textboxes RED\" style=\"order:" + idCount + "\">" + spanBoxNr + inputBox + spanBoxSort2 + removeBtn + imageBox + "</div>";
		
		setTimeout(function(){
			blockHolder.append(totalImage);
		}, 500);

		//Add to result
		resultImageBox = "<img src=\"uploads/WebUpload_" + imgSrc.name + "\" id=\"resultNr" + idCount + "\" class=\"resultImage\" style=\"order:" + idCount + "\">";
		resultHolder.append(resultImageBox);
	}

	// List setup
	else if (types === "list") {
		//Adding block
		var spanBoxSort3, listBox, totalList, resultListBox, itemRemove;
		
		itemRemove = "<span class=\"c333\"> -Remove</span>";
		spanBoxSort3 = "<span> - List - </span>";
		listBox = "<ul class=\"ulList\"><li><input class=\"c111\" type=\"text\">" + itemRemove + "</li><li><input class=\"c222\" type=\"button\" value=\"Add item\"></li></ul>";
		totalList = "<div id=\"boxNr" + idCount + "\" class=\"textboxes BLUE\" style=\"order:" + idCount + "\">" + spanBoxNr + inputBox + spanBoxSort3 + removeBtn + listBox + "</div>";

		blockHolder.append(totalList);

		//Add to result
		resultListBox = "<ul id=\"resultNr" + idCount + "\" class=\"resultList\" style=\"order:" + idCount + "\"><li></li></ul>";
		resultHolder.append(resultListBox);
	}

	// Youtube setup
	else if (types === "youtube") {
		//Adding block
		var spanBoxSort4, youtubeBox, totalYoutube, clipSrc, resultYoutubeBox;
			
		spanBoxSort4 = "<span> - Youtube clip - </span>";
		youtubeBox = "<div class=\"youtubeBox\"><span><strong>Url to video: </strong></span><input type=\"text\" id=\"clipNr" + idCount + "\"><br><span>Example: <i>https://www.youtube.com/watch?v=KYKQ6Wxr8qc </i><br>What we need: <i>KYKQ6Wxr8qc</i></span></div>";
		totalYoutube = "<div id=\"boxNr" + idCount + "\" class=\"textboxes RED\" style=\"order:" + idCount + "\">" + spanBoxNr + inputBox + spanBoxSort4 + removeBtn + youtubeBox + "</div>";
		
		blockHolder.append(totalYoutube);

		//Add to result
		resultYoutubeBox = "<iframe id=\"resultNr" + idCount + "\" class=\"resultYoutube\" style=\"order:" + idCount + "\" src=\"\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";
		resultHolder.append(resultYoutubeBox);
	}

	// Update counter
	idCount += 1;

	// start changeStuff
	changeStuff();

}

/* ------------------ changeStuff function ------------------ */
function changeStuff() {
	// Remove button
	$(".removeBtn").click(function() {
		event.preventDefault();
			var boxNum = $(this).parent().css("order");
			var resultAreas = "#resultNr" + boxNum;
				$(resultAreas).remove();
				$(this).parent().remove();
		if (($(".textboxes").length + 1) < idCount) {
			idCount -= 1;
		}
	});

	// Text update
	$(".textbox").keyup(function() {
		event.preventDefault();
			var textNr = $(this).parent().css("order");
			var resultArea = "#resultNr" + textNr;
		var textUpdate = $(this).val();
		$(resultArea).text(textUpdate);
	});

	// List text update
	$(".ulList").find(".c111").keyup(function() {
		event.preventDefault();
			var textNumber = $(this).parent().parent().parent().css("order");
			var textUpdates = $(this).val();
			var parentIndex = $(this).parent().index();
		var resultSpott = "#resultNr" + textNumber;
		$(resultSpott).children().eq(parentIndex).text(textUpdates);
	});

	// List item add
	$(".ulList").find(".c222").click(function() {
		event.preventDefault();
			var textNumber = $(this).parent().parent().parent().css("order");
			var resultSpot = "#resultNr" + textNumber;
		var newInput = "<li><input class=\"c111\" type=\"text\"><span class=\"c333\"> -Remove</span></li>";
		var newLi = "<li></li>";
		$(resultSpot).append(newLi);
		var parentSpot = $(this).parent();
		$(parentSpot).before(newInput);
	});

	// List item removeBtn-toggle
	$(".ulList").children().hover(function() {
    	$(this).find(".c333").css("display", "inline-block");
  	}, function() {
    	$(this).find(".c333").css("display", "none");
  		}
	);
	$(".ulList").find(".c333").hover(function() {
    	$(this).css("color", "red");
  	}, function() {
    	$(this).css("color", "white");
  		}
	);

	// List item remove
	$(".ulList").find(".c333").click(function() {
		event.preventDefault();
			var itemNum = $(this).parent().parent().parent().css("order");
			var resultAreass = "#resultNr" + itemNum;
			var parentsIndex = $(this).parent().index();
		$(resultAreass).children().eq(parentsIndex).remove();
		$(this).parent().remove();
	});

	// Text update
	$(".youtubeBox").children("input").change(function() {
		event.preventDefault();
			var parentOrder = $(this).parent().parent().css("order");
			var resultSpots = "#resultNr" + parentOrder;
		var clipUpdate = $(this).val();
		$(resultSpots).attr("src", "https://www.youtube-nocookie.com/embed/" + clipUpdate + "?rel=0");
	});


	// Sort things out.
	$(".boxId").change(function() {
		event.preventDefault();
		var destinationBlock, destinationResultBlock;

		var num = $(this).val(); // New destination
		var parentOrders = $(this).parent().css("order"); // "Old" order
		var resultPartner = "#resultNr" + parentOrders; // block result partner

		//move away blocks to make place for other blocks
		$(resultPartner).css("order", "0");
		$(resultPartner).attr("id", "resultNr0");
		$(this).parent().css("order", "0");
		$(this).parent().attr("id", "boxNr0");

		//Set correct orders
		if (num > parentOrders) {
			for (var ii = (parentOrders + 1); ii <= num; ii++) {
				destinationBlock = "#boxNr" + ii;
				destinationResultBlock = "#resultNr" + ii;

					$(destinationBlock).css("order", (ii - 1));
					$(destinationResultBlock).css("order", (ii - 1));
				$(destinationBlock).attr("id", "boxNr" + (ii - 1));
				$(destinationResultBlock).attr("id", "resultNr" + (ii - 1));
			}
		}
		else {
			for (var ij = (parentOrders - 1); ij >= num; ij--) {
				destinationBlock = "#boxNr" + ij;
				destinationResultBlock = "#resultNr" + ij;

					$(destinationBlock).css("order", (ij + 1));
					$(destinationResultBlock).css("order", (ij + 1));
				$(destinationBlock).attr("id", "boxNr" + (ii + 1));
				$(destinationResultBlock).attr("id", "resultNr" + (ii + 1));
			}
		}

		//moving block to new destination
		$("#resultNr0").css("order", num);
		$("#resultNr0").attr("id", "resultNr" + num);
		$("#boxNr0").css("order", num);
		$("#boxNr0").attr("id", "boxNr" + num);

			//Old simlpe sort..
		/*	$(".boxId").change(function() {
				event.preventDefault();
					var num = $(this).val();
					var fixedNum = num - 1;
					var resultPlace = "#resultNr" + fixedNum;
				$(resultPlace).css("order", num);
				$(resultPlace).attr("id", "resultNr" + num)
				$(this).parent().css("order", num);
			}); */
	});

}