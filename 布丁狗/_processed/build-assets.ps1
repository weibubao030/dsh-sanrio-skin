# Sanrio skin asset pipeline: resize + base64 -> skin-assets.json
$ErrorActionPreference = "Stop"
$dir = $PSScriptRoot
$src = Join-Path $dir "布丁狗\白天"
$out = Join-Path $dir "布丁狗\_optimized"
New-Item -ItemType Directory -Force -Path $out | Out-Null
Add-Type -AssemblyName System.Drawing

function Resize-Png($in, $w, $h, $q, $mime, $ext) {
  $img = [System.Drawing.Image]::FromFile($in)
  $tw = if ($h) { $w } else { [int]($img.Width) }
  $th = if ($h) { $h } else { [int]($img.Height * ($w / $img.Width)) }
  $bmp = New-Object System.Drawing.Bitmap($tw, $th)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = "HighQualityBicubic"
  $g.DrawImage($img, 0, 0, $tw, $th)
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq $mime }
  $pr = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $pr.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$q)
  $fp = Join-Path $out $ext
  $bmp.Save($fp, $enc, $pr)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  return $fp
}

$bgwash = Resize-Png (Join-Path $src "背景 (2).jpg") 1000 $null 72 "image/jpeg" "bgwash.jpg"
$avatar = Resize-Png (Join-Path $src "背景.jpg") 200 200 85 "image/jpeg" "avatar.jpg"
$empty  = Resize-Png (Join-Path $src "等待画面.jpg") 700 700 80 "image/jpeg" "empty.jpg"

$map = @{
  wm      = "data:image/webp;base64," + [Convert]::ToBase64String([IO.File]::ReadAllBytes((Join-Path $src "底稿.webp")))
  bgwash  = "data:image/jpeg;base64," + [Convert]::ToBase64String([IO.File]::ReadAllBytes($bgwash))
  avatar  = "data:image/jpeg;base64," + [Convert]::ToBase64String([IO.File]::ReadAllBytes($avatar))
  mascot  = "data:image/gif;base64,"  + [Convert]::ToBase64String([IO.File]::ReadAllBytes((Join-Path $src "动图.gif")))
  empty   = "data:image/jpeg;base64," + [Convert]::ToBase64String([IO.File]::ReadAllBytes($empty))
}
$map | ConvertTo-Json -Depth 3 | Set-Content -Path (Join-Path $dir "skin-assets.json") -Encoding UTF8
Write-Output ("bgwash:" + (Get-Item $bgwash).Length + " avatar:" + (Get-Item $avatar).Length + " empty:" + (Get-Item $empty).Length + " gif:" + (Get-Item (Join-Path $src '动图.gif')).Length + " json:" + (Get-Item (Join-Path $dir 'skin-assets.json')).Length)
