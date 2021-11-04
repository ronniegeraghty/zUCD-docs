---
slug: 20211104-handling-new-cics-loads-in-ucd
title: Handling New CICS LOADs in UCD
author: Ronnie Geraghty
author_title: Z DevOps Technical Specialsit @ IBM
author_url: https://github.com/ronniegeraghty
author_image_url: https://avatars.githubusercontent.com/u/28957151?v=4
tags: [UCD, Z, DevOps, CICS]
---

<!-- omit in toc -->
# *~*In Progress*~*

<!-- omit in toc -->
## Overview
In this blog post we'll look at how to set up an UrbanCode Deploy (UCD)Process that handles deploying an updated to a CICS application, where the incremental version contains updates to Load Modules already loaded into the CICS Region as well as Load Modules that are new and thus not loaded into the CICS Region yet. The UCD process will handle generating a list of CICS specific Load Modules in the incremental version we are deploying, using this list to check which of the Load Modules have been loaded into CICS already then generating a list of these already loaded Load Modules, then running NEWCOPYs on the new version on these already loaded Load Modules. 

<!-- omit in toc -->
### Contents
- [Background Info](#background-info)
- [The Version](#the-version)
- [The Process](#the-process)

## Background Info
For this blog post I used an incremental version of a basic sample insureance application that uses CICS and Db2. The incremental version of this application was built using Dependency Based Build (DBB) and the zAppBuild Framework. This information is important because during the DBB build the zAppBuild Framework assigns a property know as the DeployType to each artifact produced. For example, a program that uses CICS and Db2 would produce a DBRM and a CICS Load Module. The zAppBuild Framework would assign the DBRM artifact a DeployType of DBRM and the CICS Load Module artifact a DeployType of CICSLOAD. I then use this DeployType property in the UCD process to generate lists of specific artifact types. 

## The Version
## The Process
![Process Top Level Screenshot](/blog/2021-11-04-handling-new-cics-loads-in-ucd/process-top-level-screenshot.png)


