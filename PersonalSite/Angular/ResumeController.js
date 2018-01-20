(function (ng) {
    var resumeCtrl = function ($scope) {

        $scope.title = ' - Resume';
        $scope.resume = { skills: [], jobs: [], projects: [], groups: [] };

        var resume = $scope.resume;

        resume.skillsTest = [{ languages: [] }, { configuration: [] }, { testing: [] }, { source: [] }, { frameworks: [] }, { misc: [] }];
        var languages = ['C#', 'javascript', 'TSQL', 'Python', 'VB', 'powershell'],
            configuration = ['Sql Server', 'IIS', 'Apache'],
            frameworksAndLibraries = ['ASP.NET', 'Angular', 'jQuery', 'bootstrap', 'MVC', 'WebAPI', 'NServiceBus'],
            testing = ['NUnit', 'Moq', 'jasmine', 'mocha', 'zombie.js'],
            source = ['Git', 'SVN', 'Mercurial'],
            misc = ['Ninject', 'Regex'];

        resume.skills = [
            'C#',
            'VB',
            'Node.js',
            'Express',
            'JavaScript',
            'jQuery',
            'Bootstrap',
            'AngularJS',
            'Web Forms',
            'Windows Forms',
            'MVC',
            'WebAPI',
            'NServiceBus',
            'Rebus',
            'Entity Framework',
            'Dapper',
            'ADO.NET',
            'jasmine',
            'mocha',
            'NUnit',
            'Moq',
            'Ninject',
            'Castle Windsor',
            'TSQL',
            'Visual Studio',
            'Sql Server',
            'MongoDb',
            'RavenDb',
            'Redis',
            'SVN',
            'TFS',
            'Git',
            'Mercurial',
            'Azure',
            'Regular Expressions',
            'NuGet',
            'Excel',
            'IIS'
        ];

        var setupJob = function (company, title, startDate, endDate) {
            return {
                company: company,
                title: title,
                startDate: startDate,
                endDate: endDate
            };
        };

        var paylocity2 = setupJob('Paylocity', 'Software Engineer', " Jan '15 to Sep '15 & May '16", "Present");

        paylocity2.duties = [
            'Lead a stabilization task force for reliability engineering',
            'Write tools for migrating & testing large amounts of sensitive data',
            'Acting messaging architecture expert with Rebus',
            'Create import tools and interfaces',
            'Utilize MVC, Web API, jQuery, Angular, React & Entity Framework',
            'Create web services, web service clients, messaging architectures & nuget packages',
            'Write unit tests, integration tests, static analysis & codebase health tests'
        ];

        var particular = setupJob('Particular Software', 'Software Engineer', "September '15", "May '16");

        particular.duties = [
            'Work in open source software',
            'Work on the NServiceBus core',
            'Maintain ServicePulse with Angular and SignalR',
            'Maintain NServiceBus.RavenDb implementation',
            'Provide support for users of the Particular platform',
            'Write tests & automation',
            'Write blogs & marketing material'
        ];

        var layerframe = setupJob('Layerframe', 'Freelance Developer', "January '15", "August '15");

        layerframe.duties = [
            'Use angular, node, mongodb, express, parse & mixpanel',
            'Write, maintain, & enhance sales tools for large clients',
            'Write tools to limit or remove manual work for project managers'
        ];

        var liazon = setupJob('Liazon', 'Software Engineer', "February '14", "January '15");

        liazon.duties = [
            'Part of the architecture & scalability team',
            'Use WebAPI & NServiceBus to implement Service Oriented Architecture',
            'Architect APIs & Single Page Applications with AngularJS',
            'Write a central configuration service for shared data & service discovery',
            'Train others on client side architecture & clean code',
            'Requirements analysis & architecture for large scale initiatives',
            'Presentations & classes on various technologies & paradigms',
            'Setup & configure NuGet & Extensions repository'
        ];

        var localEdge = setupJob('LocalEdge', 'Programmer I', "December '12", "March '14");

        localEdge.duties = [
            'Clean & optimize existing C#, JavaScript, & TSQL code base',
            'Concurrent programming with features from .NET 3.5 to 4.5',
            'Sped up download service by factor of 4, reduced error / manual work',
            'Implement new user interfaces in AngularJS',
            'Convert Web Forms to MVC4 sub applications',
            'Write unit tests for new code',
            'Maintain proxy application',
            'Interface with services provided by Google/Bing/Sendori'
        ];

        var algonquin = setupJob('Algonquin Studios, Inc.', 'Developer I', "August '11", "December '12");

        algonquin.duties = [
            'Develop on multiple simultaneous projects with strict deadlines',
            'Execute detailed testing procedures & maintain technical documents',
            'Streamline & assist in company training program',
            'Maintain & enhance company software & services',
            'Deploy projects & patches to production & staging environments',
            'Optimize new & existing SQL queries & procedures to reduce overhead'
        ];

        var laptopTechnican = setupJob('Technology Services, Alfred State', 'Laptop Technician', "August '10", "May '11");

        laptopTechnican.duties = [
            'Configured & deployed client & student laptops',
            'Analyzed & resolved hardware/software problems',
            'Researched & developed more efficient work practices',
            'Created & updated pre-boot environment disks'
        ];

        laptopTechnican.hideForPrint = true;

        var residentAssistant = setupJob('Residence Life, Alfred State', 'Resident Assistant', "August '08", "May '09");

        residentAssistant.duties = [
            'Provided paraprofessional advising to undergraduate students',
            'Operated within a close-quarters living environment',
            'Trained new staff members',
            'Organized & facilitated educational & social programs',
            'Developed & refined mediation & conflict resolution skills'
        ];

        residentAssistant.hideForPrint = true;

        resume.jobs.push(paylocity2);
        resume.jobs.push(particular);
        resume.jobs.push(layerframe);
        resume.jobs.push(liazon);
        resume.jobs.push(localEdge);
        resume.jobs.push(algonquin);
        resume.jobs.push(laptopTechnican);
        resume.jobs.push(residentAssistant);

        resume.contactMe = [];

        resume.contactMe.push('colin@scionsoftware.com');
        resume.contactMe.push('' + (598 + 118) + '-' + (718 + 238) + '-' + (2786 + 658));
        resume.contactMe.push('github.com/colin-higgins');
        resume.contactMe.push('linkedin.com/in/cphiggins');
        resume.contactMe.push('twitter.com/SpykeBytes');
    };

    ng.module('SpikeBytes').controller('ResumeCtrl', ['$scope', resumeCtrl]);

}(angular));
