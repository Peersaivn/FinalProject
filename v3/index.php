<?php 
session_start();
	include("connection.php");

	// Registration Handler
	if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['first_name']))
	{
		$f_name = $_POST['first_name'];
		$l_name = $_POST['last_name'];
		$email = $_POST['email'];
		$phone = $_POST['phone'];
		$password = $_POST['password'];

		if(!empty($f_name) && !empty($l_name) && !empty($email) && !empty($phone) && !empty($password))
		{
			$hashed_password = password_hash($password, PASSWORD_BCRYPT);
			$query = "insert into tb_customers(f_name,l_name,email,phone_num,password) values ('$f_name','$l_name','$email','$phone','$hashed_password')";
			if(mysqli_query($con, $query)){
				header('Location: dashboard.php');
				exit();
			}else{
				echo "Error: " . mysqli_error($con);
			}
		}
	}

    // Login Handler
    $error = "";
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    if ($email === "" || $password === "") {
        $error = "Username and Password are required";
    }
    else {
        $query = "SELECT * FROM tb_customers WHERE email = '$email'";
        $result = mysqli_query($con, $query);
        if (mysqli_num_rows($result) === 1) {
            $user = mysqli_fetch_assoc($result);
            if (password_verify($password, $user['password'])) {
                $_SESSION['email'] = $email;
                header("Location: dashboard.php");
                exit;
            } else {
                $error = "Invalid Username or Password";
            }
        } else {
            $error = "Invalid Username or Password";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login and Registration</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
</head>
<body>
    <img src="light-lines-border-isolated.png" alt="Corner Image" class="corner-image">
    <div class="container" id="container">
        <div class="form-container sign-up">
            <form id="registrationForm" method="POST" action="">
                <h1>Create Account</h1>
                <div class="input-row">
                    <input type="name" name="first_name" placeholder="First Name" required>
                    <input type="name" name="last_name" placeholder="Last Name" required>
                </div>
                <input type="email" name="email" placeholder="Email" required>
                <input type="number" name="phone" placeholder="Phone" required>
                <div class="input-row">
                    <input type="password" name="password" placeholder="Password" required>
                    <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                </div>
                <button>Sign Up</button>
            </form>
        </div>
        <div class="form-container sign-in">
            <form method="POST" action="">
                <h1>Sign In</h1>
                <input type="email" name="email"placeholder="Email" required>
                <input type="password" name="password"placeholder="Password" required>
                <?php if(isset($error) && $error !== ""): ?>
                    <p style="color: red; font-size: 12px;"><?php echo $error; ?></p>
                <?php endif; ?>
                <button type="submit">Sign In</button>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your account details to log back into the website!</p>
                    <button class="hidden" id="login">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Hello there, Bud! Don't have an account?</h1>
                    <p>Register here to create an account and access all features of this site!</p>
                    <button class="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>