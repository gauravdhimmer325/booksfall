// Boost.Geometry (aka GGL, Generic Geometry Library)

// Copyright (c) 2008-2012 Bruno Lalande, Paris, France.
// Copyright (c) 2008-2012 Barend Gehrels, Amsterdam, the Netherlands.
// Copyright (c) 2009-2012 Mateusz Loskot, London, UK.

// This file was modified by Oracle on 2020.
// Modifications copyright (c) 2020 Oracle and/or its affiliates.
// Contributed and/or modified by Adam Wulkiewicz, on behalf of Oracle

// Parts of Boost.Geometry are redesigned from Geodan's Geographic Library
// (geolib/GGL), copyright (c) 1995-2010 Geodan, Amsterdam, the Netherlands.

// Use, modification and distribution is subject to the Boost Software License,
// Version 1.0. (See accompanying file LICENSE_1_0.txt or copy at
// http://www.boost.org/LICENSE_1_0.txt)


#ifndef BOOST_GEOMETRY_GEOMETRIES_CONCEPTS_CHECK_HPP
#define BOOST_GEOMETRY_GEOMETRIES_CONCEPTS_CHECK_HPP


#include <type_traits>

#include <boost/concept_check.hpp>
#include <boost/concept/requires.hpp>
#include <boost/core/ignore_unused.hpp>
#include <boost/variant/variant_fwd.hpp>

#include <boost/geometry/core/tag.hpp>
#include <boost/geometry/core/tags.hpp>

#include <boost/geometry/geometries/concepts/box_concept.hpp>
#include <boost/geometry/geometries/concepts/linestring_concept.hpp>
#include <boost/geometry/geometries/concepts/multi_point_concept.hpp>
#include <boost/geometry/geometries/concepts/multi_linestring_concept.hpp>
#include <boost/geometry/geometries/concepts/multi_polygon_concept.hpp>
#include <boost/geometry/geometries/concepts/point_concept.hpp>
#include <boost/geometry/geometries/concepts/polygon_concept.hpp>
#include <boost/geometry/geometries/concepts/ring_concept.hpp>
#include <boost/geometry/geometries/concepts/segment_concept.hpp>

#include <boost/geometry/algorithms/not_implemented.hpp>

namespace boost { namespace geometry
{


#ifndef DOXYGEN_NO_DETAIL
namespace detail { namespace concept_check
{

template <typename Concept>
class check
{
    BOOST_CONCEPT_ASSERT((Concept ));
};

}} // namespace detail::concept_check
#endif // DOXYGEN_NO_DETAIL



#ifndef DOXYGEN_NO_DISPATCH
namespace dispatch
{

template
<
    typename Geometry,
    typename GeometryTag = typename geometry::tag<Geometry>::type,
    bool IsConst = std::is_const<Geometry>::type::value
>
struct check : not_implemented<GeometryTag>
{};


template <typename Geometry>
struct check<Geometry, point_tag, true>
    : detail::concept_check::check<concepts::ConstPoint<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, point_tag, false>
    : detail::concept_check::check<concepts::Point<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, linestring_tag, true>
    : detail::concept_check::check<concepts::ConstLinestring<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, linestring_tag, false>
    : detail::concept_check::check<concepts::Linestring<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, ring_tag, true>
    : detail::concept_check::check<concepts::ConstRing<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, ring_tag, false>
    : detail::concept_check::check<concepts::Ring<Geometry> >
{};

template <typename Geometry>
struct check<Geometry, polygon_tag, true>
    : detail::concept_check::check<concepts::ConstPolygon<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, polygon_tag, false>
    : detail::concept_check::check<concepts::Polygon<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, box_tag, true>
    : detail::concept_check::check<concepts::ConstBox<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, box_tag, false>
    : detail::concept_check::check<concepts::Box<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, segment_tag, true>
    : detail::concept_check::check<concepts::ConstSegment<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, segment_tag, false>
    : detail::concept_check::check<concepts::Segment<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, multi_point_tag, true>
    : detail::concept_check::check<concepts::ConstMultiPoint<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, multi_point_tag, false>
    : detail::concept_check::check<concepts::MultiPoint<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, multi_linestring_tag, true>
    : detail::concept_check::check<concepts::ConstMultiLinestring<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, multi_linestring_tag, false>
    : detail::concept_check::check<concepts::MultiLinestring<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, multi_polygon_tag, true>
    : detail::concept_check::check<concepts::ConstMultiPolygon<Geometry> >
{};


template <typename Geometry>
struct check<Geometry, multi_polygon_tag, false>
    : detail::concept_check::check<concepts::MultiPolygon<Geometry> >
{};


} // namespace dispatch
#endif




namespace concepts
{


#ifndef DOXYGEN_NO_DETAIL
namespace detail
{


template <typename Geometry>
struct checker : dispatch::check<Geometry>
{};

template <BOOST_VARIANT_ENUM_PARAMS(typename T)>
struct checker<boost::variant<BOOST_VARIANT_ENUM_PARAMS(T)> >
{};

template <BOOST_VARIANT_ENUM_PARAMS(typename T)>
struct checker<boost::variant<BOOST_VARIANT_ENUM_PARAMS(T)> const>
{};


}
#endif // DOXYGEN_NO_DETAIL


/*!
    \brief Checks, in compile-time, the concept of any geometry
    \ingroup concepts
*/
template <typename Geometry>
// workaround for VS2015
#if !defined(_MSC_VER) || (_MSC_VER >= 1910)
constexpr
#endif
inline void check()
{
    detail::checker<Geometry> c;
    boost::ignore_unused(c);
}


/*!
    \brief Checks, in compile-time, the concept of two geometries, and if they
        have equal dimensions
    \ingroup concepts
*/
template <typename Geometry1, typename Geometry2>
// workaround for VS2015
#if !defined(_MSC_VER) || (_MSC_VER >= 1910)
constexpr
#endif
inline void check_concepts_and_equal_dimensions()
{
    check<Geometry1>();
    check<Geometry2>();
    assert_dimension_equal<Geometry1, Geometry2>();
}


} // namespace concepts


}} // namespace boost::geometry


#endif // BOOST_GEOMETRY_GEOMETRIES_CONCEPTS_CHECK_HPP
