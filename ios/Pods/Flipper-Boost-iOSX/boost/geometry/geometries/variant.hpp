// Boost.Geometry (aka GGL, Generic Geometry Library)

// Copyright (c) 2008-2012 Bruno Lalande, Paris, France.
// Copyright (c) 2007-2012 Barend Gehrels, Amsterdam, the Netherlands.
// Copyright (c) 2009-2012 Mateusz Loskot, London, UK.

// This file was modified by Oracle on 2018-2020.
// Modifications copyright (c) 2018-2020, Oracle and/or its affiliates.
// Contributed and/or modified by Adam Wulkiewicz, on behalf of Oracle

// Parts of Boost.Geometry are redesigned from Geodan's Geographic Library
// (geolib/GGL), copyright (c) 1995-2010 Geodan, Amsterdam, the Netherlands.

// Use, modification and distribution is subject to the Boost Software License,
// Version 1.0. (See accompanying file LICENSE_1_0.txt or copy at
// http://www.boost.org/LICENSE_1_0.txt)

#ifndef BOOST_GEOMETRY_GEOMETRIES_VARIANT_GEOMETRY_HPP
#define BOOST_GEOMETRY_GEOMETRIES_VARIANT_GEOMETRY_HPP


#include <boost/variant/variant_fwd.hpp>

#include <boost/geometry/core/point_type.hpp>


namespace boost { namespace geometry
{

namespace detail
{

template <typename ...>
struct parameter_pack_first_type {};

template <typename T, typename ... Ts>
struct parameter_pack_first_type<T, Ts...>
{
    typedef T type;
};

} // namespace detail


template <BOOST_VARIANT_ENUM_PARAMS(typename T)>
struct point_type<boost::variant<BOOST_VARIANT_ENUM_PARAMS(T)> >
    : point_type
        <
            typename detail::parameter_pack_first_type
                <
                    BOOST_VARIANT_ENUM_PARAMS(T)
                >::type
        >
{};


}} // namespace boost::geometry


#endif // BOOST_GEOMETRY_GEOMETRIES_VARIANT_GEOMETRY_HPP
