import React from 'react'

export default function AboutPage() {
    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-black to-gray-800 text-white py-24">        <div className="max-w-5xl mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold mb-6">
                    About StoryCraft
                </h1>

                <p className="text-xl max-w-3xl mx-auto">
                    StoryCraft is a platform where writers create,
                    share, and inspire through storytelling.
                </p>
            </div>
            </section>

            {/* Mission */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">
                        Our Mission
                    </h2>

                    <p className="text-gray-700 leading-8">
                        We believe every story deserves to be heard.
                        StoryCraft empowers writers, bloggers, and
                        creators to share their ideas with the world
                        through a simple and engaging platform.
                    </p>

                    <p className="text-gray-700 leading-8 mt-4">
                        Whether you're writing fiction, personal
                        experiences, educational content, or creative
                        articles, StoryCraft provides the tools to
                        bring your stories to life.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Our Values
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-4xl mb-4">✍️</div>
                            <h3 className="text-xl font-semibold mb-2">
                                Creativity
                            </h3>
                            <p className="text-gray-600">
                                Encouraging unique voices and original
                                storytelling.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-4xl mb-4">🌍</div>
                            <h3 className="text-xl font-semibold mb-2">
                                Community
                            </h3>
                            <p className="text-gray-600">
                                Connecting readers and writers from around
                                the world.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-semibold mb-2">
                                Growth
                            </h3>
                            <p className="text-gray-600">
                                Helping creators improve and expand their
                                reach.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">
                        Our Story
                    </h2>

                    <p className="text-gray-700 leading-8">
                        StoryCraft began with a simple idea: make
                        publishing stories accessible to everyone.
                        Many talented writers have amazing ideas but
                        lack a platform to share them.
                    </p>

                    <p className="text-gray-700 leading-8 mt-4">
                        Today, StoryCraft continues to evolve as a
                        place where creativity thrives and readers
                        discover meaningful content every day.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-100 text-black py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Start Your Story Today
                    </h2>

                    <p className="mb-8 text-lg">
                        Join our growing community of writers and
                        readers.
                    </p>

                    <a
                        href="/blog/create"
                        className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Get Started
                    </a>
                </div>
            </section>
        </main>
    );

}