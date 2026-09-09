"use client";
import PublicPage from "@/components/PublicPage";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { NewsArticle } from "@/lib/news-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Tag,
  Share2,
  BookOpen,
  TrendingUp,
  Heart,
  Bookmark,
  Eye,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import Image from "next/image";
import ArticleSidebar from "@/components/news/ArticleSidebar";
import NewsSidebar from "@/components/news/NewsSidebar";

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "finance":
      return "bg-blue-500 hover:bg-blue-600";
    case "technology":
      return "bg-green-500 hover:bg-green-600";
    case "business":
      return "bg-purple-500 hover:bg-purple-600";
    case "news":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

export default function NewsArticleContent({
  article,
}: {
  article: NewsArticle;
}) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const totalScroll = scrollHeight - clientHeight;
      const currentProgress = (scrollTop / totalScroll) * 100;
      setReadingProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Implement API call to update like count
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Implement API call to update bookmark status
  };

  const handleShare = async (platform: string) => {
    const articleUrl = window.location.href;
    const articleTitle = article?.title || "Aggre Capital News";

    if (navigator.share) {
      try {
        await navigator.share({
          title: articleTitle,
          url: articleUrl,
        });
        setCopied(false);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      let shareUrl = "";
      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(articleTitle)}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(articleTitle)}`;
          break;
        case "copy":
          navigator.clipboard.writeText(articleUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          return;
        default:
          break;
      }
      if (shareUrl) {
        window.open(shareUrl, "_blank", "noopener,noreferrer");
      }
    }
    setShowShareMenu(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    });
  };

  return (
    <PublicPage eyebrow="Berita & insight" title="" className="ac-article">
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Reading Progress Bar */}
        <div
          className="fixed top-0 left-0 h-1 bg-teal-500 z-50 transition-all duration-100 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>

        {/* Sticky Header for Actions */}
        <div className="sticky top-0 z-40 bg-white shadow-sm py-3 px-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="text-gray-600 hover:text-teal-600"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali
            </Button>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                className={`${isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-600`}
                title="Like"
              >
                <Heart
                  className="h-5 w-5"
                  fill={isLiked ? "currentColor" : "none"}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmark}
                className={`${isBookmarked ? "text-blue-500" : "text-gray-500"} hover:text-blue-600`}
                title="Bookmark"
              >
                <Bookmark
                  className="h-5 w-5"
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="text-gray-500 hover:text-teal-600"
                  title="Share"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                {showShareMenu && (
                  <Card className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                    <CardContent className="p-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:bg-gray-100"
                        onClick={() => handleShare("facebook")}
                      >
                        <Facebook className="h-4 w-4 mr-2 text-blue-600" />{" "}
                        Facebook
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:bg-gray-100"
                        onClick={() => handleShare("twitter")}
                      >
                        <Twitter className="h-4 w-4 mr-2 text-blue-400" />{" "}
                        Twitter
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:bg-gray-100"
                        onClick={() => handleShare("linkedin")}
                      >
                        <Linkedin className="h-4 w-4 mr-2 text-blue-700" />{" "}
                        LinkedIn
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:bg-gray-100"
                        onClick={() => handleShare("copy")}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2 text-gray-500" />
                        )}{" "}
                        {copied ? "Copied!" : "Copy Link"}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <ArticleSidebar
                article={article}
                readingProgress={readingProgress}
                onScrollToTop={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                onLike={handleLike}
                onBookmark={handleBookmark}
                onShare={() => setShowShareMenu(!showShareMenu)}
                isLiked={isLiked}
                isBookmarked={isBookmarked}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              {/* Article Header */}
              <div className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Badge
                    className={`${getCategoryColor(article.category)} px-4 py-2 text-sm font-medium`}
                  >
                    {article.category}
                  </Badge>
                  {article.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-sm font-medium">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                  {article.title}
                </h1>

                {article.excerpt && (
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
                    <p className="text-xl text-gray-700 leading-relaxed font-medium">
                      {article.excerpt}
                    </p>
                  </div>
                )}

                {/* Article Meta */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 mb-12">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-teal-500 mr-3" />
                    <span>
                      Oleh:{" "}
                      <span className="font-semibold text-gray-800">
                        {article.author}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-teal-500 mr-3" />
                    <span>
                      Tanggal:{" "}
                      <span className="font-semibold text-gray-800">
                        {formatDate(article.published_at || article.created_at)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-teal-500 mr-3" />
                    <span>
                      Waktu Baca:{" "}
                      <span className="font-semibold text-gray-800">
                        {article.read_time || 5} menit
                      </span>
                    </span>
                  </div>
                </div>

                {article.featured_image && (
                  <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg mb-12">
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10 mb-12">
                <div
                  className="prose prose-xl max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              {/* Article Tags */}
              {article.tags && article.tags.split(",").length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Tags:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {article.tags.split(",").map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-4 py-2 text-base bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                      >
                        <Tag className="h-4 w-4 mr-2" /> {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Card */}
              <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-l-4 border-teal-500 p-6 rounded-r-lg shadow-sm mb-12">
                <CardContent className="flex items-center p-0">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src="/images/logo.png"
                      alt={article.author}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {article.author}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Penulis di Aggre Capital
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      Menyajikan berita dan analisis terkini seputar keuangan,
                      teknologi, dan bisnis untuk membantu Anda membuat
                      keputusan yang lebih baik.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons at bottom */}
              <div className="flex justify-center space-x-4 mb-12">
                <Button
                  variant="outline"
                  onClick={handleLike}
                  className={`flex items-center px-6 py-3 rounded-full text-lg ${isLiked ? "border-red-500 text-red-500 bg-red-50" : "border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500 hover:bg-red-50"}`}
                >
                  <Heart
                    className="h-5 w-5 mr-2"
                    fill={isLiked ? "currentColor" : "none"}
                  />
                  {isLiked ? "Disukai" : "Suka"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBookmark}
                  className={`flex items-center px-6 py-3 rounded-full text-lg ${isBookmarked ? "border-blue-500 text-blue-500 bg-blue-50" : "border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50"}`}
                >
                  <Bookmark
                    className="h-5 w-5 mr-2"
                    fill={isBookmarked ? "currentColor" : "none"}
                  />
                  {isBookmarked ? "Tersimpan" : "Simpan"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center px-6 py-3 rounded-full text-lg border-gray-300 text-gray-600 hover:border-teal-400 hover:text-teal-500 hover:bg-teal-50"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Bagikan
                </Button>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 order-3">
              <NewsSidebar currentArticleId={article.id} />
            </div>
          </div>
        </div>
      </div>
    </PublicPage>
  );
}
