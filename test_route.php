<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$user = App\Models\User::first();
$request = Illuminate\Http\Request::create('/purchase-orders', 'GET');
$request->setUserResolver(function () use ($user) { return $user; });
$response = $kernel->handle($request);
echo $response->getStatusCode() . "\n";
if ($response->getStatusCode() == 404) {
    echo $response->getContent();
}
