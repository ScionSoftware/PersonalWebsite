
var resumeCtrl = function ($scope) {

    $scope.title = ' - Resume';
    $scope.resume = { skills: [], jobs: [], projects: [], groups: [] };

    var resume = $scope.resume;

    resume.skillsTest = [{ languages: [] }, { configuration: [] }, { testing: [] }, { source: [] }, { frameworks: [] }, { misc: [] }];
    var languages = ['C#', 'javascript', 'TSQL', 'Python', 'VB', 'powershell'];
    var configuration = ['Sql Server', 'IIS', 'Apache'];
    var frameworksAndLibraries = ['ASP.NET', 'Angular', 'jQuery', 'bootstrap', 'MVC', 'WebAPI', 'NServiceBus'];
    var testing = ['NUnit', 'Moq', 'jasmine', 'mocha', 'zombie.js'];
    var source = ['Git', 'SVN', 'Mercurial'];
    var misc = ['Ninject', 'Regex', 'Mercurial'];

    resume.skills = [
        'C#',
        'VB',
        'JavaScript',
        'jQuery',
        'Bootstrap',
        'AngularJS',
        'Web Forms',
        'Windows Forms',
        'MVC',
        'WebAPI',
        'NServiceBus',
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
        'SSMS',
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
        return { company: company, title: title, startDate: startDate, endDate: endDate };
    };
    var liazon = setupJob('Liazon', 'Software Engineer', "February '14", 'Present');
    liazon.duties = [
        'Part of the architecture and scalability team',
        'Utilize WebAPI and NServiceBus to implement Service Oriented Architecture',
        'Architect APIs and Single Page Applications with AngularJS',
        'Write a central configuration service for shared data and service discovery',
        'Train others on client side architecture and clean code',
        'Requirements analysis and architecture for large scale initiatives',
        'Presentations and classes on various technologies and paradigms',
        'Setup and configure NuGet and Extensions repository'
    ];
    var localEdge = setupJob('LocalEdge', 'Programmer I', "December '12", "March '14");
    localEdge.duties = [
        'Clean and optimize existing C#, JavaScript, and TSQL code base',
        'Concurrent programming with features from .NET 3.5 to 4.5',
        'Sped up download service by factor of 4, reduced error / manual work',
        'Implement new user interfaces in AngularJS',
        'Architect and implement design patterns for clean code',
        'Convert Web Forms to MVC4 sub applications',
        'Write unit tests for all application rewrites',
        'Interface with services provided by search engines'
    ];
    var algonquin = setupJob('Algonquin Studios, Inc.', 'Developer I', "August '11", "December '12");
    algonquin.duties = [
	    'Develop on multiple simultaneous projects with strict deadlines',
	    'Execute detailed testing procedures and maintain technical documents',
	    'Streamline and assist in company training program',
	    'Maintain and enhance company software and services',
	    'Deploy projects and patches to production and staging environments',
	    'Optimize new and existing SQL queries and procedures to reduce overhead'
    ];
    var laptopTechnican = setupJob('Technology Services, Alfred State', 'Laptop Technician', "August '10", "May '11");
    laptopTechnican.duties = [
	    'Configured and deployed client and student laptops',
        'Analyzed and resolved hardware/software problems',
        'Researched and developed more efficient work practices',
        'Created and updated pre-boot environment disks'
    ];
    var residentAssistant = setupJob('Residence Life, Alfred State', 'Resident Assistant', "August '08", "May '09");
    residentAssistant.duties = [
	    'Provided paraprofessional advising to undergraduate students',
        'Operated within a close-quarters living environment',
        'Trained new staff members',
        'Organized and facilitated educational and social programs',
        'Developed and refined mediation and conflict resolution skills'
    ];

    resume.jobs.push(liazon);
    resume.jobs.push(localEdge);
    resume.jobs.push(algonquin);
    resume.jobs.push(laptopTechnican);
    resume.jobs.push(residentAssistant);
};

spikeBytes.controller('ResumeCtrl', ['$scope', resumeCtrl]);
