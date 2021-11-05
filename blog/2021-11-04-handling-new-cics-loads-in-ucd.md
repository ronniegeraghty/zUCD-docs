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
- [The Component Version](#the-component-version)
- [The Process](#the-process)
  - [Generate Program List](#generate-program-list)
  - [check-if-new-member](#check-if-new-member)
  - [if cics loads to newcopy](#if-cics-loads-to-newcopy)
  - [NEWCOYP Programs](#newcoyp-programs)

## Background Info
For this blog post I used an incremental version of a basic sample insureance application that uses CICS and Db2. The incremental version of this application was built using Dependency Based Build (DBB) and the zAppBuild Framework. This information is important because during the DBB build the zAppBuild Framework assigns a property know as the DeployType to each artifact produced. For example, a program that uses CICS and Db2 would produce a DBRM and a CICS Load Module. The zAppBuild Framework would assign the DBRM artifact a Deploy Type of DBRM and the CICS Load Module artifact a Deploy Type of LOAD. I then use this Deploy Type property in the UCD process to generate lists of specific artifact types. 

## The Component Version 
![UCD Component Version Screenshot](/blog/2021-11-04-handling-new-cics-loads-in-ucd/ucd-component-version.png) 
Above is a screen shot of the component version used in my deployment process. You can see the version has 2 PDSs `IBMUSER.DBB.GENAPP.DBRM` & `IBMUSER.DBB.GENAPP.LOAD`, that each contain 4 members. Note that the members in `IBMUSER.DBB.GENAPP.DBRM`are all DBRMs and thus have a Deploy Type of `DBRM`. Likewise, the members in `IBMUSER.DBB.GENAPP.LOAD` are all CICS Load Modules and have a Deploy Type of `LOAD`. The CICS Load artifacts that end in `01` are existing CICS Load Modules and need to be NEWCOPYed. The CICS Load artifacts that end in `RG` are new CICS Load Modules that do not need to be NEWCOPYed. Trying to run our NEWCOPY process on these new CICS Loads would result in the NEWCOPY process failing. So how do we set up our process to only NEWCOPY the existing CICS Loads? Let's look at the next section to see the process that can handle this. 
## The Process
![Process Top Level Screenshot](/blog/2021-11-04-handling-new-cics-loads-in-ucd/process-top-level-screenshot.png)
Above is a screen shot of the UCD Deployment process that I used to deploy the version shown in the [component version](#the-component-version) section. The process handles activites like downloading the artifacts to our deployment targert envrionment, putting those artifacts in the correct PDSs, then handling performing the necessary BINDS and NEWCOPYs. Since this blog post focuses on how to handling performing NEWCOPYs on CICS Load Modules that are updates to already loaded CICS Loads and skip the NEWCOPY process on net new CICS Loads we will gloss over the **Download Artifacts for zOS** & **Deploy Data Sets** steps. These two steps take care of downloading the artifacts from our artifact repo and then placing the artifacts in the proper PDSs. We'll also gloss over the **GenBndCard** & **Bind Package & Plan** steps. These two steps generate a list of BIND Packages from the DBRMs in our version then performs the BINDS. The steps in the deployment process we will focus on are the [**Generate Program List**](#generate-program-list), [**check-if-new-member**](#check-if-new-member), [**if cics loads to newcopy**](#if-cics-loads-to-newcopy), and [**NEWCOPY Programs**](#newcoyp-programs) steps. 
### Generate Program List 
This step uses the [Generate Artifact Information](https://www.urbancode.com/plugindoc/z-os-utility-2#generate_artifact_information) step from the [z/OS Utility](https://www.urbancode.com/plugin/z-os-utility/) plugin. For this step the `For Each` option should be set to `PDS Member`. This tells the step to generate a list based on all the PDS Members in the version. The `Deploy Type Filter` option should be set to `/.*LOAD/`. This option tells the step to only include PDS Members in the list that haev a Deploy Type property that matches the regex pattern `/.*LOAD/`, mean out list will only contan entries for our CICS Loads in the version. The last step option we have to set is the `Template` option. This should be set to `${member},`. This field tells the step to use the member name of each artifact as the entry in the list, followed by a comma to seperate each entry. The rest of the options for this step can eiher be left as their default or just left blank. Using these options will have the step generate an ouput property of `text` that contains a comma seperated list of the CICS Loads in the version being deployed. 
![Generate Program List Output Properties](/blog/2021-11-04-handling-new-cics-loads-in-ucd/generate-program-list-output-properties.png)
Now this output property can be used as an input for other steps. 
### check-if-new-member
### if cics loads to newcopy 
### NEWCOYP Programs