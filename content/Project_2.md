---
title: "Project 2: Filters, Hybrids, and Blending"
tags:
  - CS280A
  - proj2
  - image_processing
  - hybrid_images
  - blending
date: 2025-09-19
permalink: /cs280A/proj2/
draft: false
---

# Part 1: Fun with Filters

## 1.1 Convolutions from Scratch

The assignment started with “write your own convolution.”  
Yes, that thing every library already has.  

- First: **4 loops** (the pain is real).  
- Then: **2 loops** (ah, better).  
- Finally: **compare with SciPy** (cheating, but allowed).  

Applied it to:
- a test image  
- a 9×9 box filter (aka “make everything blurry and sad”)  
- finite difference filters \(D_x, D_y\) (edges, baby)

![[1.1_comparison.png]]

---

## 1.2 Finite Difference Operator

The idea: take derivatives of the image → get edges.  
What I got: a grayscale image that looks like it survived a thunderstorm.  

Steps:  
- Compute \(I_x\), \(I_y\).  
- Gradient magnitude \(||\nabla I||\).  
- Threshold it. Tweak threshold until edges look ~cool~.  

![[1.2_comparison.png]]

---

## 1.3 Derivative of Gaussian (DoG) Filter

Naïve approach: blur then differentiate.  
Smarter approach: **pre-blur the filter itself** (DoG).  

Turns out they look the same (mathematically, they should), but it feels like cheating in the best way.

![[1.3_comparison.png]]
![[1.3.2_comparison.png]]
![[1.3.3_DoG_vs_two_pass.png]]
---


## Bells & Whistles (Part 1)

Color! Edges are not only about magnitude, but direction too.  
So I mapped orientation → hue in HSV. Suddenly, edges look like a rave.  

![[1.X_comparison.png]]

---

# Part 2: Fun with Frequencies

## 2.1 Image Sharpening (Unsharp Mask)

Pick a blurry image. Blur it more. Then “unblur” it by adding details back.  
Basically, Photoshop’s “Sharpen” button but with extra suffering.  

Results:  
- Original (meh)  
- Blurred (painful)  
- Sharpened (chef’s kiss… depending on α)  

![[2.1_unsharp_masking.png]]
![[2.1_blurNresharp.png]]

---

## 2.2 Hybrid Images

The magic trick: combine low-frequencies from one image + high-frequencies from another.  
Up close → one face. Step back → another. Brain.exe has stopped working.  

For my fav pair, I also plotted Fourier transforms, just to prove the math works and not witchcraft.  
![[2.2_hybrid_image_JLo_Mariah.png]]
- The Fourier transforms show us the frequency content. You can see that Mariah’s image has strong low-frequency energy concentrated tightly in the center (smooth shading, broad features), while JLo’s has more spread-out energy toward the edges, indicating richer high-frequency details (wrinkles, edges, fine textures). The hybrid’s spectrum combines both patterns.
- This makes the decomposition crystal clear. On the left, JLo’s **high-pass image** isolates her sharp features—the crisp edges around the eyes, nose, and facial lines. In the middle, Mariah’s **low-pass image** keeps her soft skin tones and broader facial structure. On the right, adding them back together reconstructs the hybrid, where depending on your viewing distance, you either see Mariah’s smooth features or JLo’s sharp details pop out.
![[2.2_hybrid_image_Ye_Taylor.png]]
### Bells & Whistles for Hybrid

Tried different color strategies:  
- GG = Gray + Gray (boring)  
- LG = Low-pass Color + High-pass Gray (like color contacts)  
- HG = High-pass Color + Low-pass Gray (reverse cosplay)  
- CC = Color + Color (maximum chaos)  

![[2.2_hybrid_image_JLo_Mariah_BellsnWhistles.png]]

---

## 2.3 Gaussian and Laplacian Stacks

Stacks ≠ pyramids.  
- Pyramid = shrink each level.  
- Stack = keep the size, just blur more.  

So you end up with 5 versions of the same apple and orange, like they’re getting progressively drunk.  
Laplacians are just differences between Gaussians, a.k.a. “edges with attitude.”  

![[2.3.1_oraple.png]]

---

## 2.4 Multiresolution Blending (“Oraple” Journey)

Finally, the famous **Oraple**.  
Take an apple, take an orange, build stacks, add a mask, pray.  
Result: fruit that does not exist, but should.  

Masks matter:  
- Hard mask = obvious seam.  
- Soft mask + Gaussian stack = magic.  

![[2.4.1_oraple.png]]
![[2.4.2_jlo_mariah_blend.png]]
![[2.4.3_tongue_blend.png]]
---

## Bells & Whistles (Part 2)

Why stop at grayscale? Color strategies make blends look… well, sometimes amazing, sometimes cursed.  

Also played with different masks (diagonal split, random shape).  
Sometimes it works. Sometimes you get modern art.  

![[2.4.X_color_blend.png]]

---

## Reflection: What I Learned

- High-freq = details, low-freq = structure.  
- Our brains are gullible.  
- Alignment and masks are 90% of the job.  
- Sigma is not just a Greek letter, it’s a lifestyle.  
