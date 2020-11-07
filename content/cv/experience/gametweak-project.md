---
type: project
title: GameTweak (Personal Project)
location: Haywards Heath
startDate: '2017-10'
endDate: '2018-06'
technologies:
    - C#
    - .NET Framework
    - .NET Core
    - WPF
    - MVVM
    - Material Design
    - Serverless
    - AWS
    - API Gateway
    - Lambda Functions
    - DynamoDB
    - S3
    - CloudFormation
    - Sentry.io
    - Git
    - BitBucket
    - Visual Studio
---

Started development of a full stack desktop application which allows players to configure similar games in a single place and store and share their configuration across games and PC’s.
I used this time to build my software development experience, with the future goal of releasing a product to customers via Steam. 
The project consisted of the following stack:

* Desktop client built with .NET Framework (later updated to .NET Core), WPF & XAML, Material Design, integrates with Steamworks, and includes UI localization.
* Serverless on AWS using API Gateway, Lambda Functions, DynamoDB, and CloudFormation.
* Core parsing library built with a TDD approach using Pidgin parser combinator to handle a variety of config files for game engines.
* Testing with xUnit.
* Logging & error reporting with NLog and Sentry.io.
