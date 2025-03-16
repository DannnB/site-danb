---
title: "Azure App Service Disaster Recovery: How to Prepare for Microsoft’s DR Changes (March 2025)"
datetime: 2025-03-17
img: 
alt: "Prepare for Azure App Service DR retirement (March 2025). Learn best practices for geo-redundant backups, failover strategies, and ensuring app continuity."
description: "Prepare for Azure App Service DR retirement (March 2025). Learn best practices for geo-redundant backups, failover strategies, and ensuring app continuity."
tags: ['Azure', 'Microsoft', 'Disaster Recovery', 'Azure App Service', 'Azure Databases', 'Backup']
show: true
---

# Azure App Service Disaster Recovery: How to Prepare for Microsoft's DR Changes (March 2025)

## What is Changing with Azure App Service Disaster Recovery?

Like me, and many others, you might’ve got an email from Microsoft Azure about disaster recovery on Azure App Services. Microsoft sent this email, to me, two weeks before the **announced 31st of March 2025 deadline**, I love having so much notice (I didn’t see anything about this before on any channels…).

So what was it this time? The “magic” behind Azure App Service will not automatically put Azure App Service web apps into disaster recovery mode if a region goes down after the announced date.

This email may have confused some people_. It’s one of those convenient services you trust to…just work? Like buying your favourite safe food, then the manufacturer has changed a single insignificant ingredient they think won’t matter._

**The information within this article is only advice, if you’re not fully certain you must seek your own professional consultancy.**

To get back on track, you probably want something out of reading this.

### Definitions

These definitions and terms might below might sound technical, but understanding them clearly will help you navigate the steps below more effectively

(This definition list is AI generated if you’re wondering after I’ve written the article, work smart…):

-   **Azure App Service**: A fully managed platform for building, deploying, and scaling web apps.
-   **Disaster Recovery (DR)**: The process of maintaining business continuity and recovering system functionality during and after a catastrophic event.
-   **Platform-level DR**: Automated **D**isaster **R**ecovery features built into the Azure platform that previously handled failover automatically.
-   **Failover**: The process of switching to a redundant or standby system when the primary system fails.
-   **Multi-region Strategy**: Deploying applications across multiple geographic regions to ensure continuity if one region fails.
-   **Locally Redundant Storage (LRS)**: Data storage that maintains multiple copies within a single region.
-   **Geo-Redundant Storage (GRS)**: Storage that replicates data to a secondary region for enhanced disaster protection.
-   **Read-Access Geo-Redundant Storage (RA-GRS)**: GRS with the added ability to read from the secondary region.
-   **Azure Traffic Manager**: A DNS-based traffic load balancer that can route users to different regional deployments.
-   **Azure Front Door**: A cloud CDN service that provides global load balancing and site acceleration.

_Personal note: I wish I had some failovers in my life sometimes, any tips?_

### Now onto the useful stuff

**I want to take you through the process I had to use to check many Azure accounts**. So hopefully you can avoid anything nasty in future in the rare chance a region has an outage and also improve your Azure Disaster Recovery best practices.

This is what you’ll have to read to make sure you are ready:

1.  What the retirement of platform-level DR mean for Azure App Service
2.  How to check if your existing backups are set up correctly
3.  What your options are for ensuring business continuity

## Understanding Microsoft’s DR Retirement

### Why is this happening?

Microsoft does lots of things in the background of their vast Azure offering. The more convenient, high level it is to you, it’s going to have managed service layers below. For a very long time that I know of, Azure App Service took automatic steps to restore or relocate your web apps (failover) if a regional disaster happened.

With this new change, you are now fully responsible for your or your client's failover. So, if you haven’t already set up backups in a certain way, you will lose applications and data if Microsoft can’t recover it.

### Are you affected?

Yes, you probably are if you’ve clicked on this article or maybe just a curious soul wanting to know things. If you have any web app on the Azure App Service, deployed in a single region (e.g. UK South), then it is at some type of risk.

_I’ll try to help you to determine this risk but at the end of the day, it’s your applications, you need to keep them available even when Microsoft drops this on you._

### **Let’s break this down for the tiers offered**

**Free & Shared App Service**

No built-in backup functionality suitable for a disaster recovery (DR) strategy. They can be used for testing or very light workloads and come with no SLA.

**If this is you**, Microsoft is advising you to upgrade to at least the Basic tier for a built-in backup feature. Or higher tiers for more DR options. I would then from my recent experience say it’s a good idea to set up those failover and disaster recovery strategies asap. Especially if you have important applications/data and any of you’re own or client SLAs you need to meet.

**Basic, Standard, Premium and Isolated**

If using these tiers, then you’re a step ahead as they all include the App Service Backup feature and an SLA.

But beware, it is very easy to set up a backup feature in the same region, either the auto backups (default hourly) or custom backup configuration with an Azure Storage Account in the same region by default. That’s Local Redundant Storage (LRS) and not Geo-redundant storage (RA-GRS) which would store the data in multiple regions e.g. UK South and UK West.

**If this is you**, then you’ll have to verify the backup settings of all web apps, for any that have no failover (other region-identical web apps running for example) or are not sending backups to another region (geo-redundancy).

**A note about other services**

Don’t forget that you might have **other services like databases** which need some type of disaster recovery strategy set up so check them out too. I won’t cover things like this right now, as this article focuses on the recently announced changes to the Azure App Service configurations using the recommended Azure disaster recovery best practices of applying geo-redundant storage and regional failover techniques.

## Step-by-Step Guide: How to Check Your Azure Web App Backups and DR Configuration

**The below steps I took should give you a starter, saving you some research time, and then you can make your own plans and decisions.**

For a quick, FYI that tripped me up, just because you see backups in the Azure Portal user interface (in this case Azure App Service) doesn’t mean you are DR-ready. There could be no redundancy, backup or failover configured. Comparing this with the CLI commands, they may show no backups at all, which I deem a sign that you have no custom-configured backups.

Its time to be serious about the next steps!

### Step 1

Confirm your App Service Plan tier

1.  **Azure Portal**: Navigate to your **Web App** → **Scale up (App Service plan)**. You’ll see if you’re on **Free**, **Shared**, **Basic**, **Standard**, or **Premium**.
2.  **Azure CLI**:

If you want to use the CLI then these commands should work

```
az webapp list --output table  
az appservice plan list --output table
```

### Step 2

Verify the web app backup settings

**In the Portal**:

1.  Go to **Web App** → **Backups** → Check if backups have been configured (scheduled or manual). You might see backups, but that does not mean they are the custom backups that go into a storage account.
2.  If “Configure custom backups” is available, see if the schedule is enabled and note which **Storage Account** is used.

**Via Azure CLI**:

If this returns no entries, you probably only have manual backups (or none at all that have been set using the custom backup configuration).

```
az webapp config backup list \\  
  --resource-group <ResourceGroupName> \\  
  --webapp-name <WebAppName> \\  
  --output table
```

### Step 3

Check storage redundancy (If a Storage Account is linked or you set one up during this process)

Your web app backups might be stored in **Locally Redundant Storage (LRS)**, which only protects data within one region.

1.  Note the **Storage Account** name
2.  Go to **Storage Accounts** → select the storage account from step 1 → **Configuration** (or **Replication**).
3.  Look for **Geo-Redundant (GRS)** or **Read-Access Geo-Redundant (RA-GRS)**.
4.  If it’s **LRS or ZRS, your backups are not protected from regional outages**. Switch to Geo-Redundant (GRS) or Read-Access Geo-Redundant (RA-GRS) to ensure your backups remain available.

## Top Azure DR Strategies: Choosing the Best Backup and Failover Option

### I do like a table, let’s review (Risk, Complexity & Cost Matrix)

Before I expand into options, you might find a table that gives you an idea of your options that I’ve created below.

![](https://cdn-images-1.medium.com/max/800/1*x9rR-5XP3s_pJUXZ-myFRQ.png)

### So here are some options you can pick

_Remember, this is advice and might not exactly fit your configuration, SLAs or business requirements. Seek professional consultancy._

![](https://cdn-images-1.medium.com/max/800/1*kct3e0ZORsJDf-d514MnNQ.png)

#### **(1) Geo-redundant backups (Basic Tier & geo-redundant storage)**

1.  Set up Azure App Service backups and **configure them with a geo-redundant storage setting**.
2.  Test backups by restoring them to a staging environment at any interval you see fit.
3.  And, as always, please don’t forget to document the manual recovery processes for the next person.
4.  Test it!

#### **(2) Multi-region deployment (Active-passive or Active-Active)**

1.  Deploy your Azure App Service **web apps in a secondary Azure region** (e.g. UK South to UK West).
2.  Set up Azure Traffic Manager or Azure Front Door to handle traffic for failover situations.
3.  Set up a failover group or active geo-replication for SQL databases to ensure database availability (not covered in this article sorry)
4.  Test failover!

#### **(3) Enable backups in a geo-redundant storage account**

1.  Develop Infrastructure-as-Code that will help you quickly deploy everything to another Azure region if required.
2.  Test, and document restoration process timelines and any expected timelines for a manual failover like this

Remember, **free or shared tiers might not come with any DR protection** features. Making them very unsuitable for production or near-production applications after the DR's retirement on the 31st of March 2025.

### My Personal Recommendation (TL;DR):

1.  **Small-scale but production workloads**: Enable **geo-redundant backups** to balance simplicity, cost, and DR effectiveness.
2.  **Critical business workloads**: Go for **Multi-region deployment** (Active-Passive with Azure Traffic Manager or Azure Front Door) if near-zero downtime is a requirement.
3.  **Moderate workloads with acceptable downtime**: Set up **Geo-redundant backups** and use Infrastructure-as-Code for speedy manual recovery to another region.

## As always, do some tests of your DR setup

So, whatever option and strategy you pick, do some testing and don’t just base it on documentation and theory!

**You need to simulate failover** — Maybe point your traffic to another region or run a backup restore to see if the web app behaves as expected.

**You need to document everything** — I’m not just saying it as it’s part of the Solutions Architect role to do but you need to keep instructions and scripts that can be used quickly in a real disaster recovery situation.

**You need to do regular tests** — Maybe annual, semi-annual or more regular tests to spot any issues, but it all depends on your business requirements / SLAs.

## At last, a summary

Microsoft’s method of giving notice might not be the longest. But at least you can now take action based on the upcoming deprecation of the platform-level DR for Azure App Service.

From this, you should’ve learned that the best place to start is auditing your current App Service backup configurations and verifying any storage redundancies.

You’ll have to pick a disaster recovery option that best fits your downtime tolerance and budget.

[Microsoft has a best practices guide on setting up Disaster Recovery for Azure App Services.](https://learn.microsoft.com/en-us/azure/reliability/reliability-app-service?pivots=free-shared-basic)

Test, test test! Fail fast. Get it done.

I hope this proactive approach will support your apps from regional disasters and keep users, stakeholders and yourself happy when something like this occurs.

**Let me know how you get on, I’d love to update the article or make a follow on one based on people's real situations and solutions**