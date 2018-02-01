<!DOCTYPE html>
<html>
<head>
    <title>Article Builder</title>
    <meta charset="utf-8">
    <meta name="author" content="Kim Pettersson">
	<meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
    <link rel="stylesheet" href="style.css">
</head>

<body>

<!-- _____ LEFT BAR ____ -->
<section id="left_bar">
	<h2>Add more to article:</h2>
	<input type="button" id="add_textarea" value="ADD TEXTAREA">
	<br><br>
	<form method="post" id="fileinfo" name="fileinfo" onsubmit="return submitForm();">
        <label>Select a file:</label><br>
        <input type="file" name="file" id="fileToUpload" accept="image/*" required />
        <input type="submit" id="uploadSubmit" value="ADD IMAGE" />
    </form>
	<br><br>
	<input type="button" id="add_list" value="ADD LIST">
	<br><br>
	<input type="button" id="add_youtube" value="ADD YOUTUBE CLIP">
</section>

<!-- _____ MIDDLE BAR ____ -->
<section id="middle_bar">
	<form id="article_form">
		<span><strong>Set Title: </strong></span><input type="text" id="article_title">
		<fieldset>
			<legend> ARTICLE BUILDER: </legend>
			<article id="block_holder">
				<!-- Where magic happens -->
			</article>
		</fieldset>
		<input type="submit" id="formSubmit" value="Send to website">
	</form>
	<form id="article_result">
		<fieldset>
			<legend> RESULT: </legend>
			<article id="result_holder">
				<!-- Where article come alive -->
				<h3 id="article_title_set">SOME TITLE..</h3>
			</article>
		</fieldset>
	</form>
</section>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="articleApp.js"></script>

</body>
</html>
