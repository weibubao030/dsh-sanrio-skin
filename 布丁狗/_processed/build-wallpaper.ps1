# Sanrio wallpaper: cutout (flood-fill, C#5) + composite + set desktop wallpaper
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

$att = 'C:\Users\shxdf\.dsh\attachments\v1\objects\2f\2f455b698a38ad525dade3240c45cfe2ace068e08d74e915bdd592d87fc1b61f'
$dir = $PSScriptRoot
$cutPng = Join-Path $dir 'pudding_cutout.png'
$wallJpg = Join-Path $dir 'pudding_wallpaper.jpg'

Add-Type -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;
using System.Runtime.InteropServices;
public static class Cutout {
  private static bool IsW(byte[] buf,int stride,int x,int y,int threshold){
    int i=y*stride+x*4;
    return buf[i]>=threshold && buf[i+1]>=threshold && buf[i+2]>=threshold;
  }
  public static void RemoveWhiteBg(Bitmap bmp,int threshold){
    int w=bmp.Width,h=bmp.Height;
    Rectangle rect=new Rectangle(0,0,w,h);
    BitmapData data=bmp.LockBits(rect,ImageLockMode.ReadWrite,PixelFormat.Format32bppArgb);
    int stride=data.Stride;
    byte[] buf=new byte[stride*h];
    Marshal.Copy(data.Scan0,buf,0,buf.Length);
    bool[] gone=new bool[w*h];
    Stack<int> stack=new Stack<int>();
    for(int x=0;x<w;x++){
      int idx0=x; if(!gone[idx0]&&IsW(buf,stride,x,0,threshold)){gone[idx0]=true;stack.Push(idx0);}
      int idx1=(h-1)*w+x; if(!gone[idx1]&&IsW(buf,stride,x,h-1,threshold)){gone[idx1]=true;stack.Push(idx1);}
    }
    for(int y=0;y<h;y++){
      int idx0=y*w; if(!gone[idx0]&&IsW(buf,stride,0,y,threshold)){gone[idx0]=true;stack.Push(idx0);}
      int idx1=y*w+(w-1); if(!gone[idx1]&&IsW(buf,stride,w-1,y,threshold)){gone[idx1]=true;stack.Push(idx1);}
    }
    int[] dx=new int[]{1,-1,0,0};
    int[] dy=new int[]{0,0,1,-1};
    while(stack.Count>0){
      int idx=stack.Pop();
      int y=idx/w;
      int x=idx%w;
      for(int k=0;k<4;k++){
        int nx=x+dx[k];
        int ny=y+dy[k];
        if(nx<0||nx>=w||ny<0||ny>=h) continue;
        int ni=ny*w+nx;
        if(gone[ni]) continue;
        if(IsW(buf,stride,nx,ny,threshold)){ gone[ni]=true; stack.Push(ni); }
      }
    }
    for(int y=0;y<h;y++){
      for(int x=0;x<w;x++){
        int idx=y*w+x;
        if(gone[idx]){ int bi=y*stride+x*4; buf[bi+3]=0; }
      }
    }
    Marshal.Copy(buf,0,data.Scan0,buf.Length);
    bmp.UnlockBits(data);
  }
}
'@ -ReferencedAssemblies System.Drawing

Add-Type -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class Blend {
  public static Bitmap FadeScale(Bitmap src,int dw,int dh,float overall,float bottomFade){
    Bitmap dst=new Bitmap(dw,dh,PixelFormat.Format32bppArgb);
    using(Graphics g=Graphics.FromImage(dst)){
      g.InterpolationMode=System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
      g.SmoothingMode=System.Drawing.Drawing2D.SmoothingMode.HighQuality;
      g.DrawImage(src,0,0,dw,dh);
    }
    Rectangle rect=new Rectangle(0,0,dw,dh);
    BitmapData data=dst.LockBits(rect,ImageLockMode.ReadWrite,PixelFormat.Format32bppArgb);
    int stride=data.Stride; byte[] buf=new byte[stride*dh];
    Marshal.Copy(data.Scan0,buf,0,buf.Length);
    for(int y=0;y<dh;y++){
      float fy=dh>1?(float)y/(dh-1):0f;
      float f=overall*(1f-bottomFade*fy);
      if(f<0)f=0; if(f>1)f=1;
      for(int x=0;x<dw;x++){ int i=y*stride+x*4; buf[i+3]=(byte)(buf[i+3]*f); }
    }
    Marshal.Copy(buf,0,data.Scan0,buf.Length);
    dst.UnlockBits(data);
    return dst;
  }
}
'@ -ReferencedAssemblies System.Drawing

$src = [System.Drawing.Bitmap]::FromFile($att)
$bmp = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g0 = [System.Drawing.Graphics]::FromImage($bmp); $g0.DrawImage($src,0,0); $g0.Dispose()
[Cutout]::RemoveWhiteBg($bmp, 238)
$bmp.Save($cutPng, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose(); $src.Dispose()
Write-Output ("cutout saved: " + $cutPng)

$W=[System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Width
$H=[System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Height
$wall = New-Object System.Drawing.Bitmap($W,$H)
$g=[System.Drawing.Graphics]::FromImage($wall)
$g.SmoothingMode='HighQuality'; $g.InterpolationMode='HighQualityBicubic'
$rect=New-Object System.Drawing.Rectangle(0,0,$W,$H)
$brush=New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect,[System.Drawing.Color]::FromArgb(255,255,250,243),[System.Drawing.Color]::FromArgb(255,252,239,222),90)
$g.FillRectangle($brush,$rect)
$cut=[System.Drawing.Image]::FromFile($cutPng)
$th=[int]($H*0.72); $tw=[int]($cut.Width*($th/$cut.Height))
$x=$W-$tw; $y=[int](($H-$th)/2)
$dest=New-Object System.Drawing.Rectangle($x,$y,$tw,$th)
$blend=[Blend]::FadeScale($cut,$tw,$th,0.78,0.9)
$g.DrawImage($blend,$x,$y,$tw,$th)
$blend.Dispose()
$g.Dispose(); $cut.Dispose()
$enc=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$p=New-Object System.Drawing.Imaging.EncoderParameters(1)
$p.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]92)
$wall.Save($wallJpg,$enc,$p); $wall.Dispose()
Write-Output ("wallpaper saved: " + $wallJpg + " " + $W + "x" + $H)

Add-Type -Namespace W -Name N -MemberDefinition @'
[DllImport("user32.dll", CharSet=CharSet.Auto)] public static extern int SystemParametersInfo(int uAction,int uParam,string lpvParam,int fuWinIni);
'@
[W.N]::SystemParametersInfo(20,0,$wallJpg,0x01 -bor 0x02) | Out-Null
Write-Output ("desktop wallpaper set: " + $wallJpg)
