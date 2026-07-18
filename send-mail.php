
<?php

error_reporting(E_ALL);
ini_set('display_errors',1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try{

$mail->isSMTP();

$mail->Host = "smtp.gmail.com";

$mail->SMTPAuth = true;

$mail->Username='abinav@navaproductions.in';

$mail->Password='Abi@nava123';

$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

$mail->Port = 587;


$mail->setFrom("abinav@navaproductions.in","NAVA Website");

$mail->addAddress("abinav@navaproductions.in");

$mail->isHTML(true);

$name = $_POST["fullName"] ?? "";
$company = $_POST["company"] ?? "";
$email = $_POST["email"] ?? "";
$phone = $_POST["phone"] ?? "";
$project = $_POST["projectType"] ?? "";
$brief = $_POST["brief"] ?? "";

$mail->Subject = "New Contact Form";


$mail->Body = "

<h2>New Contact</h2>

<b>Name :</b> $name <br><br>

<b>Company :</b> $company <br><br>

<b>Email :</b> $email <br><br>

<b>Phone :</b> $phone <br><br>

<b>Project :</b> $project <br><br>

<b>Brief :</b> $brief

";

$mail->send();

echo "success";
exit;

}
catch(Exception $e){
    http_response_code(500);
    echo "error";

}

?>