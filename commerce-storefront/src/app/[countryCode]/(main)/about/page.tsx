"use client"

import { Heading, Text } from "@medusajs/ui"
import { Award, Heart, Leaf, Shield, Users, Zap } from "lucide-react"
import TestimonialsSection from "@modules/home/components/testimonials-section"
import { useTranslations } from "next-intl"

export default function AboutPage() {
  const t = useTranslations("about.hero")
  const tWhy = useTranslations("about.whyPatches")
  const tHow = useTranslations("about.howToUse")
  const tValues = useTranslations("about.values")
  const tStory = useTranslations("about.story")
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-novapatch-bg-light via-blue-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heading
            level="h1"
            className="text-4xl md:text-5xl font-bold text-novapatch-title mb-6"
          >
            {t("title")}
          </Heading>
          <Text className="text-xl text-gray-700 leading-relaxed">
            {t("subtitle")}
          </Text>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Heading
              level="h2"
              className="text-3xl md:text-4xl font-bold text-novapatch-title mb-6"
            >
              {tWhy("title")}
            </Heading>
            <Text className="text-lg text-gray-700 mb-6 leading-relaxed">
              {tWhy("paragraph1")}
            </Text>
            <Text className="text-lg text-gray-700 leading-relaxed">
              {tWhy("paragraph2")}
            </Text>
          </div>

          <div className="bg-novapatch-bg-light rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <Text className="font-semibold text-novapatch-title">
                  {tWhy("features.noFillers")}
                </Text>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <Text className="font-semibold text-novapatch-title">
                  {tWhy("features.vegan")}
                </Text>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <Text className="font-semibold text-novapatch-title">
                  {tWhy("features.glutenFree")}
                </Text>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <Text className="font-semibold text-novapatch-title">
                  {tWhy("features.fastAction")}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-novapatch-bg-cream py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Heading
            level="h2"
            className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center"
          >
            {tHow("title")}
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-novapatch-bg-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-novapatch-button">
                  1
                </span>
              </div>
              <Heading
                level="h3"
                className="text-xl font-semibold text-novapatch-title mb-4"
              >
                {tHow("step1.title")}
              </Heading>
              <Text className="text-gray-600 leading-relaxed">
                {tHow("step1.description")}
              </Text>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-novapatch-bg-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-novapatch-button">
                  2
                </span>
              </div>
              <Heading
                level="h3"
                className="text-xl font-semibold text-novapatch-title mb-4"
              >
                {tHow("step2.title")}
              </Heading>
              <Text className="text-gray-600 leading-relaxed">
                {tHow("step2.description")}
              </Text>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-novapatch-bg-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-novapatch-button">
                  3
                </span>
              </div>
              <Heading
                level="h3"
                className="text-xl font-semibold text-novapatch-title mb-4"
              >
                {tHow("step3.title")}
              </Heading>
              <Text className="text-gray-600 leading-relaxed">
                {tHow("step3.description")}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <Heading
          level="h2"
          className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center"
        >
          {tValues("title")}
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-novapatch-button" />
            </div>
            <Heading
              level="h3"
              className="text-xl font-semibold text-novapatch-title mb-3"
            >
              {tValues("quality.title")}
            </Heading>
            <Text className="text-gray-600">
              {tValues("quality.description")}
            </Text>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <Heading
              level="h3"
              className="text-xl font-semibold text-novapatch-title mb-3"
            >
              {tValues("sustainability.title")}
            </Heading>
            <Text className="text-gray-600">
              {tValues("sustainability.description")}
            </Text>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <Heading
              level="h3"
              className="text-xl font-semibold text-novapatch-title mb-3"
            >
              {tValues("community.title")}
            </Heading>
            <Text className="text-gray-600">
              {tValues("community.description")}
            </Text>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
            <Heading
              level="h3"
              className="text-xl font-semibold text-novapatch-title mb-3"
            >
              {tValues("innovation.title")}
            </Heading>
            <Text className="text-gray-600">
              {tValues("innovation.description")}
            </Text>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <Heading
              level="h3"
              className="text-xl font-semibold text-novapatch-title mb-3"
            >
              {tValues("transparency.title")}
            </Heading>
            <Text className="text-gray-600">
              {tValues("transparency.description")}
            </Text>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <Heading
              level="h3"
              className="text-xl font-semibold text-novapatch-title mb-3"
            >
              {tValues("safety.title")}
            </Heading>
            <Text className="text-gray-600">
              {tValues("safety.description")}
            </Text>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <Heading
          level="h2"
          className="text-3xl md:text-4xl font-bold text-novapatch-title mb-8 text-center"
        >
          {tStory("title")}
        </Heading>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <Text>{tStory("paragraph1")}</Text>

          <Text>{tStory("paragraph2")}</Text>

          <Text>{tStory("paragraph3")}</Text>
        </div>
      </div>
      <TestimonialsSection />
    </div>
  )
}
