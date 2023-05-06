% A case for open water systems
% Abhiram Mullapudi
% May 5, 2023


Climate change-driven extreme weather events, aging infrastructure, and rapid urbanization are pushing our urban water infrastructure to the brink of failure.
Though these infrastructure systems can be redesigned and rebuilt to tackle environmental challenges, many communities face budgetary constraints that prohibit them from doing so.
The emergence of affordable computing and sensing technology has narrowed the distinction between the digital and physical worlds and ushered in a new era of urban water systems.
By retrofitting infrastructure with wireless sensors and digitally actuated gates, pumps, valves, etc., the performance of the urban water systems can be monitored and controlled in an optimal fashion in near real-time.
Cities and utilities worldwide are increasingly relying on this new generation of cyber-physical systems to “squeeze” more performance out of the physical infrastructure and extend the life of existing urban water systems beyond their design capacity.

\

Despite the popularity of digital water systems (often also described as smart water systems) in the research domain, their adoption in the industry has been limited.
Research focused on using machine learning, wireless sensor networks, and web-based solutions to solve urban water challenges has grown exponentially in the last decade.
Yet, a fundamental socio-technical knowledge gap exists about how these technologies can be adopted for widespread real-world applications.
In this post, I make the case that hydroinformatics research based on an open-source philosophy can help us address some of these knowledge gaps. Specifically, how we can build community trust in these new technologies and ensure their accessibility and equitability to facilitate wider adoption.

\

### Building Community Trust in Digital Water Systems

\

Cities and utilities are answerable to the regulatory authorities and the communities they serve.
They often face a choice between a validated traditional solution or a promising novel but a nascent solution.
The lack of approaches to quantify the risks and opportunity costs of these choices creates a barrier for communities to evaluate and adopt digital water solutions.
Similarly, a significant gap exists between state-of-the-art research and practice in the urban water industry.
Digital water technologies in the research domain are generally evaluated on specific scenarios in simulated settings. A community standard does not yet exist to assess the generalizability and applicability of these technologies in the real world - this further exacerbates the gap between academia and industry. 

\

The machine learning community has developed benchmarking datasets and metrics for quantifying the efficacy of data science methodologies.
While these benchmarks were initially successful in quantifying efficiency, they failed to evaluate the generalizability of the methods.
Furthermore, these benchmark datasets inadvertently created a competition where algorithms were “tuned” to beat the metrics instead of generalizability and adaptability to real-world problems.
As Goodhart’s law states, when a measure becomes a target, it ceases to be a useful measure.
Thus, instead of creating benchmarking datasets for evaluating digital water solutions, there is a need for creating frameworks and methodologies that account for the uniqueness of each urban water network and empowers the stakeholders to evaluate these solutions holistically.

\

We created pystorms to address the lack of an evaluation framework for stormwater control algorithms.
pystorms is an open-source Python-based framework that provides an easy-to-use Python interface and a collection of real-world inspired stormwater control scenarios to evaluate control algorithms.
We aspire that pystorms will continue growing as a community resource for developing stormwater control algorithms and contributing additional challenging real-world inspired stormwater control benchmark scenarios.
Similar efforts are being spearheaded in wastewater and drinking water communities.
However, even though these frameworks provide a common platform for the industry and academia to evaluate the generalizability of digital water solutions, these independent efforts fall short of helping communities understand and quantify the viability and risks of adopting these technologies.

\

Akin to the water industry, the automotive industry is undergoing a digital transformation with the advent of autonomous driving.
The National Highway Traffic Safety Administration (NHTSA) has established standards on levels of automation.
These standards guide the research, regulate industry products, and also help consumers better understand the risks associated with these products.
Similarly, in the stormwater industry, the Chartered Institution of Water and Environmental Management (CIWEM) has developed guidelines for engineers to evaluate the quality of the stormwater model calibration.
These guidelines are network agnostic and provide a methodology and a set of metrics for understanding the strengths and limitations of the stormwater models.
These guidelines and standards aid in building community trust in technologies.
Drawing on these ideas, combining the evaluation frameworks with a set of standards can help stakeholders better understand the benefits and risks associated with digital water technologies and facilitate their adoption.
Furthermore, developing these standards in an open environment with urban water stakeholder voices is vital to ensure that these standards represent the community’s concerns.
Though efforts are being led in professional organizations toward defining digital water technologies, there is a need for community-led efforts like the Linux Foundation to develop and maintain standards and evaluation guidelines.

\

### Building Accessible and Equitable Digital Water Systems

\

Digital water technologies are arguably more useful to communities that cannot afford large-scale infrastructure projects.
But the existence of these technologies does not guarantee their accessibility.
Digital water technology adoption to date has been led by cities that have the resources to partner with industry leaders to co-design and implement these technologies.
Unfortunately, most of these solutions are built on custom and often proprietary technologies.
This creates a premium on the time and resources required to implement digital water solutions.
Thus, making these solutions inaccessible to the communities that need them the most. 

\

Open-source software is attributed as one of the reasons for the technological boom.
This is because open-source software has reduced the entry barrier, made technology accessible, and enabled startups to create products with minimal overhead that reach a broader audience.
The widespread use of technology has made open-source software an indispensable part of digital infrastructure, almost akin to roads and bridges.
As a result, several non-profit organizations funded by technology firms and government organizations have been founded to maintain, develop, and ensure the accessibility of these open-source community tools.
Similarly, in the urban water domain, open-source tools and frameworks like pyswmm, OWA-EPANET, and open-storm.org have enabled startups to create digital water solutions that are used worldwide.
In addition, in the past decade, there has also been a significant push in academia to develop open-source tools.
While these open-source technologies have successfully aided the development of digital water solutions, considerable challenges must be addressed before these solutions become accessible to the communities that need them.
Based on the success of community-led open-source tools in the web technology domain, I believe that creating a platform to facilitate the development and maintenance of open-source community tools can help us reduce our reliance on custom and proprietary software and make digital water technologies more accessible.

\

There is active research in the artificial intelligence community into algorithm bias and the equitability of machine learning-driven technologies.
Such machine learning-based black box methodologies also underpin most emerging digital water technologies.
Hence, there is a need to understand the biases inherent in these methodologies and quantify the associated risk in the context of urban water systems.
For instance, a machine learning-based stormwater control system could operate a particular storage asset close to its upper threshold to maximize the overall network's performance.
However, this decision increases the flooding risk to the community in the storage asset's vicinity.
If such risks are not understood and tackled, they could lead to catastrophic issues in the community.
Hence, there is a need to evaluate the performance of these technologies from a social-equity perspective.
Though many fundamental socio-technical questions must be answered before addressing equity challenges in water systems, open-source software can help us address some of these challenges.
Open technologies enable stakeholders to evaluate the underlying components, turning these black-box approaches into glass-box methodologies.
Transparency into the methods can help us better understand the biases inherent in these algorithms and design socio-technical heuristics that can guide the development of equitable digital water systems.

\

### Summary:

\

Digital transformation stands to transform the operation and design of urban water networks. However, fundamental socio-technical knowledge gaps must be answered before these systems can become commonplace. In this post, I make a case that an open-source philosophy can help address some of these challenges. There is a need for a community-led effort to facilitate the development of standards and tools to aid in the digital transformation of urban water systems. We can draw on the experiences of other fields that are more mature in their digital transformation process and accelerate the pace of digitization in the urban water sector. Furthermore, we can learn from the accessibility and equity challenges currently encountered in these fields and create systems to address these challenges.
