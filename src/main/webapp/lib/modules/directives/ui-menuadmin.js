(function (window, vx, undefined) {
    'use strict';
    var mod = vx.module('ibsapp');
    var directive = {};
    directive.uiMenuadmin = ['$parse', '$timeout',
        function ($parse, $timeout) {
            var defaults = {};
            return {
                restrict: 'A',
                scope: true,
                link: function ($scope, element, attrs) {
                    // 获得参数
                    var menuSource = attrs.uiMenuadmin || "menu", template, itemSelectExp = attrs.itemSelect, fn;
                    fn = $parse(itemSelectExp, null, true);
                    template = $('<ul class="nav"></ul>');
                    $scope.$watch(function () {
                        return $scope.$eval(menuSource);
                    }, function (newValue, oldValue) {
                        if (newValue) {
                            createMenu(newValue);
                            bindEvent(template);
                        }
                    });
                    function createMenu(menus) {
                        var firstNode = '' +
                            '<li class="level1 active">' +
                            '   <a class="home"><i class="fa fa-home icon"></i><span>1231</span></a>' +
                            '</li>';
                        var spaceLine = '<li class="line dk"></li>';
                        var nav_ul2, nav_ul3;
                        template.append(firstNode);
                        vx.forEach(menus, function (temp1, index) {
                            var temp_level1, temp_level2, temp_level3, level1_link, level2_link, level3_link, menuList2, menuList3;

                            temp_level1 = $("<li class='level1'></li>");
                            level1_link = $(
                                '<a class="auto"> ' +
                                '   <span class="pull-right text-muted"> ' +
                                '       <i class="fa fa-fw fa-angle-right text"></i> ' +
                                '       <i class="fa fa-fw fa-angle-down text-active"></i> ' +
                                '   </span> ' +
                                '   <i class="fa fa-' + temp1.icon + ' icon"></i> ' +
                                '   <span>' + temp1.ActionName + '</span> ' +
                                '</a>');
                            temp_level1.append(level1_link);

                            menuList2 = temp1.children;
                            if (menuList2 && menuList2.length > 0) {
                                nav_ul2 = $("<ul style='display: none;' class='nav nav-list2'></ul>");
                                vx.forEach(menuList2, function (temp2, index) {
                                    temp_level2 = $("<li class='level2'></li>");
                                    var hasChild = false;
                                    menuList3 = temp2.children;
                                    if (menuList3 && menuList3.length > 0) {
                                        hasChild = true;
                                    }
                                    if (hasChild) {
                                        level2_link = $(
                                            '<a class="auto"> ' +
                                            '   <span class="pull-right text-muted"> ' +
                                            '       <i class="fa fa-fw fa-angle-down text-active"></i> ' +
                                            '       <i class="fa fa-fw fa-angle-right text"></i> ' +
                                            '   </span> ' +
                                            '   <span>' + temp2.ActionName + '</span> ' +
                                            '</a>');
                                    } else {
                                        level2_link = $('<a class="leaf"><span>' + temp2.ActionName + '</span></a>');
                                        level2_link.data("$item", temp2);
                                    }
                                    temp_level2.append(level2_link);

                                    if (hasChild) {
                                        nav_ul3 = $("<ul style='display: none;' class='nav nav-list3'></ul>");
                                        vx.forEach(menuList3, function (temp3, index) {
                                            temp_level3 = $("<li class='level3'></li>");
                                            level3_link = $(
                                                '<a class="leaf"> ' +
                                                '   <span>' + temp3.ActionName + '</span> ' +
                                                '</a>');
                                            level3_link.data("$item", temp3);
                                            temp_level3.append(level3_link);
                                            nav_ul3.append(temp_level3);
                                        });
                                        temp_level2.append(nav_ul3);
                                    }
                                    nav_ul2.append(spaceLine);
                                    nav_ul2.append(temp_level2);
                                });
                                temp_level1.append(nav_ul2);
                            }
                            template.append(spaceLine);
                            template.append(temp_level1);
                        });
                        element.append(template);
                    }

                    function bindEvent(template) {
                        template.on("click", function (event) {
                        	
                            var target = event.target, link, ul, item;
                            link = $(target).closest("a");
                            ul = link.next();
                            if (ul.is(":hidden")) {
                                ul.slideDown();
                                ul.parent().addClass("active");
                                
                                //关闭其他打开的菜单
                                link.parent().siblings().find("ul").slideUp();
                                link.parent().siblings().removeClass("active");
                                
                            } else {
                                ul.slideUp();
                                ul.parent().removeClass("active");
                            }
                            if (link.hasClass("leaf") || link.hasClass("home")) {
                                item = link.data("$item") || {"ActionName": "Home"};
                                var callback = function () {
                                    fn($scope, {$item: item});
                                };
                                $scope.$apply(callback);
                            }
                        });
                    }

                }
            };
        }];
    mod.directive(directive);
})(window, window.vx);